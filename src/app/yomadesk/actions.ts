"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { banco } from "@/lib/yomadesk/db";
import {
  categoriasDespesa,
  clientes,
  configuracaoFatura,
  consumos,
  contasBancarias,
  despesas,
  empresa,
  faturaItens,
  faturas,
  itensCatalogo,
  pacotesCredito,
} from "@/lib/yomadesk/schema";
import { obterConfiguracaoFatura, pacoteParaConsumir } from "@/lib/yomadesk/queries";
import { enviarArquivo } from "@/lib/yomadesk/upload";

function revalidarGestao() {
  revalidatePath("/yomadesk");
  revalidatePath("/yomadesk/clientes");
  revalidatePath("/yomadesk/faturas");
}

function camposClienteDe(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim() || null,
    telefone: String(formData.get("telefone") ?? "").trim() || null,
    notas: String(formData.get("notas") ?? "").trim() || null,
    rua: String(formData.get("rua") ?? "").trim() || null,
    numero: String(formData.get("numero") ?? "").trim() || null,
    cep: String(formData.get("cep") ?? "").trim() || null,
    cidade: String(formData.get("cidade") ?? "").trim() || null,
    uidIde: String(formData.get("uidIde") ?? "").trim() || null,
    notaPrivada: String(formData.get("notaPrivada") ?? "").trim() || null,
    portalB2bHabilitado: formData.get("portalB2bHabilitado") === "on",
  };
}

export async function criarCliente(formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  if (!nome) return;
  const db = banco();
  await db.insert(clientes).values({ nome, ...camposClienteDe(formData) });
  revalidarGestao();
}

export async function atualizarCliente(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const db = banco();
  await db
    .update(clientes)
    .set({ nome: String(formData.get("nome") ?? "").trim(), ...camposClienteDe(formData) })
    .where(eq(clientes.id, id));
  revalidatePath(`/yomadesk/clientes/${id}`);
  revalidarGestao();
}

export async function criarPacote(formData: FormData) {
  const clienteId = String(formData.get("clienteId") ?? "");
  const descricao = String(formData.get("descricao") ?? "").trim();
  const creditosTotais = Number(formData.get("creditosTotais") ?? 0);
  if (!clienteId || !descricao || !creditosTotais) return;
  const precoTxt = String(formData.get("preco") ?? "").trim();
  const validadeTxt = String(formData.get("validadeEm") ?? "").trim();
  const db = banco();
  await db.insert(pacotesCredito).values({
    clienteId,
    descricao,
    creditosTotais,
    preco: precoTxt || null,
    validadeEm: validadeTxt ? new Date(validadeTxt) : null,
  });
  revalidatePath(`/yomadesk/clientes/${clienteId}`);
  revalidarGestao();
}

export async function registrarAula(formData: FormData) {
  const clienteId = String(formData.get("clienteId") ?? "");
  const servico = String(formData.get("servico") ?? "").trim();
  const nota = String(formData.get("nota") ?? "").trim();
  if (!clienteId || !servico) return;

  const pacote = await pacoteParaConsumir(clienteId);
  if (!pacote) {
    redirect(`/yomadesk/clientes/${clienteId}?erro=sem-credito`);
  }

  const db = banco();
  await db.transaction(async (tx) => {
    await tx.insert(consumos).values({ pacoteId: pacote.id, servico, nota: nota || null });
    await tx
      .update(pacotesCredito)
      .set({ creditosUsados: sql`${pacotesCredito.creditosUsados} + 1` })
      .where(eq(pacotesCredito.id, pacote.id));
  });
  revalidatePath(`/yomadesk/clientes/${clienteId}`);
  revalidarGestao();
}

export async function criarFatura(formData: FormData) {
  const clienteId = String(formData.get("clienteId") ?? "");
  if (!clienteId) return;
  const descricoes = formData.getAll("itemDescricao").map(String);
  const quantidades = formData.getAll("itemQuantidade").map(Number);
  const valores = formData.getAll("itemValor").map(Number);

  const itens = descricoes
    .map((descricao, i) => ({
      descricao: descricao.trim(),
      quantidade: quantidades[i] || 1,
      valorUnitario: valores[i] || 0,
    }))
    .filter((it) => it.descricao);
  if (!itens.length) return;

  const total = itens.reduce((soma, it) => soma + it.quantidade * it.valorUnitario, 0);

  const db = banco();
  const [{ total: totalFaturas }] = await db.select({ total: sql<number>`count(*)`.mapWith(Number) }).from(faturas);
  const numero = `INV-${String(totalFaturas + 1).padStart(4, "0")}`;
  const config = await obterConfiguracaoFatura();
  const vencimentoEm = new Date();
  vencimentoEm.setDate(vencimentoEm.getDate() + config.prazoFaturaDias);

  await db.transaction(async (tx) => {
    const [fatura] = await tx
      .insert(faturas)
      .values({ numero, clienteId, total: total.toFixed(2), status: "rascunho", vencimentoEm })
      .returning({ id: faturas.id });
    await tx.insert(faturaItens).values(
      itens.map((it) => ({
        faturaId: fatura.id,
        descricao: it.descricao,
        quantidade: it.quantidade,
        valorUnitario: it.valorUnitario.toFixed(2),
      }))
    );
  });
  revalidatePath(`/yomadesk/clientes/${clienteId}`);
  revalidarGestao();
}

// Importador provisório: só lida com um CSV de Clientes (nome/email/telefone).
// O mapeamento de colunas vai ser ajustado assim que tivermos um export real
// do Magic Heidi — por enquanto aceita cabeçalhos em PT/IT/EN comuns.
function parseLinhaCsv(linha: string): string[] {
  const campos: string[] = [];
  let atual = "";
  let dentroAspas = false;
  for (let i = 0; i < linha.length; i++) {
    const c = linha[i];
    if (c === '"') {
      dentroAspas = !dentroAspas;
    } else if (c === "," && !dentroAspas) {
      campos.push(atual.trim());
      atual = "";
    } else {
      atual += c;
    }
  }
  campos.push(atual.trim());
  return campos;
}

export async function importarClientesCsv(formData: FormData) {
  const arquivo = formData.get("arquivo");
  if (!(arquivo instanceof File) || arquivo.size === 0) return;

  const texto = await arquivo.text();
  const linhas = texto.split(/\r?\n/).filter((l) => l.trim());
  if (linhas.length < 2) redirect("/yomadesk/importar?erro=vazio");

  const cabecalho = parseLinhaCsv(linhas[0]).map((h) => h.toLowerCase());
  const idxNome = cabecalho.findIndex((h) => ["nome", "name", "cliente", "nome e cognome"].includes(h));
  const idxEmail = cabecalho.findIndex((h) => h.includes("email") || h.includes("mail"));
  const idxTelefone = cabecalho.findIndex((h) => h.includes("telefono") || h.includes("telefone") || h.includes("phone"));

  if (idxNome === -1) redirect("/yomadesk/importar?erro=sem-coluna-nome");

  const db = banco();
  let importados = 0;
  for (const linha of linhas.slice(1)) {
    const campos = parseLinhaCsv(linha);
    const nome = campos[idxNome]?.trim();
    if (!nome) continue;
    await db.insert(clientes).values({
      nome,
      email: idxEmail !== -1 ? campos[idxEmail]?.trim() || null : null,
      telefone: idxTelefone !== -1 ? campos[idxTelefone]?.trim() || null : null,
    });
    importados++;
  }

  revalidarGestao();
  redirect(`/yomadesk/clientes?importados=${importados}`);
}

export async function atualizarStatusFatura(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !status) return;
  const db = banco();
  await db
    .update(faturas)
    .set({
      status: status as (typeof faturas.status.enumValues)[number],
      pagaEm: status === "paga" ? new Date() : null,
    })
    .where(eq(faturas.id, id));
  revalidarGestao();
}

// --- YomaDeskV2: empresa, contas bancárias, catálogo, despesas, personalização ---

function revalidarEmpresa() {
  revalidatePath("/yomadesk/empresa");
  revalidatePath("/yomadesk/personalizar");
}

export async function salvarEmpresa(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const db = banco();
  await db
    .update(empresa)
    .set({
      nome: String(formData.get("nome") ?? "").trim(),
      rua: String(formData.get("rua") ?? "").trim() || null,
      numero: String(formData.get("numero") ?? "").trim() || null,
      cep: String(formData.get("cep") ?? "").trim() || null,
      cidade: String(formData.get("cidade") ?? "").trim() || null,
      email: String(formData.get("email") ?? "").trim() || null,
      telefone: String(formData.get("telefone") ?? "").trim() || null,
      taxaIva: String(formData.get("taxaIva") ?? "normal_8_1") as (typeof empresa.taxaIva.enumValues)[number],
      isentaIva: formData.get("isentaIva") === "on",
    })
    .where(eq(empresa.id, id));
  revalidarEmpresa();
}

export async function criarContaBancaria(formData: FormData) {
  const banco_ = String(formData.get("banco") ?? "").trim();
  const iban = String(formData.get("iban") ?? "").trim();
  const titular = String(formData.get("titular") ?? "").trim();
  if (!banco_ || !iban || !titular) return;
  const db = banco();
  await db.insert(contasBancarias).values({
    banco: banco_,
    iban,
    titular,
    moeda: String(formData.get("moeda") ?? "CHF").trim() || "CHF",
    qrIban: formData.get("qrIban") === "on",
  });
  revalidarEmpresa();
}

export async function removerContaBancaria(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const db = banco();
  await db.delete(contasBancarias).where(eq(contasBancarias.id, id));
  revalidarEmpresa();
}

export async function criarItemCatalogo(formData: FormData) {
  const descricao = String(formData.get("descricao") ?? "").trim();
  const precoUnitario = String(formData.get("precoUnitario") ?? "").trim();
  if (!descricao || !precoUnitario) return;
  const db = banco();
  await db.insert(itensCatalogo).values({
    descricao,
    precoUnitario,
    tipo: String(formData.get("tipo") ?? "servico") as (typeof itensCatalogo.tipo.enumValues)[number],
    unidade: String(formData.get("unidade") ?? "").trim() || null,
  });
  revalidatePath("/yomadesk/itens");
}

export async function atualizarItemCatalogo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const descricao = String(formData.get("descricao") ?? "").trim();
  const precoUnitario = String(formData.get("precoUnitario") ?? "").trim();
  if (!id || !descricao || !precoUnitario) return;
  const db = banco();
  await db
    .update(itensCatalogo)
    .set({
      descricao,
      precoUnitario,
      tipo: String(formData.get("tipo") ?? "servico") as (typeof itensCatalogo.tipo.enumValues)[number],
      unidade: String(formData.get("unidade") ?? "").trim() || null,
    })
    .where(eq(itensCatalogo.id, id));
  revalidatePath("/yomadesk/itens");
}

export async function removerItemCatalogo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const db = banco();
  await db.delete(itensCatalogo).where(eq(itensCatalogo.id, id));
  revalidatePath("/yomadesk/itens");
}

export async function criarCategoriaDespesa(formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  if (!nome) return;
  const db = banco();
  await db.insert(categoriasDespesa).values({ nome, icone: String(formData.get("icone") ?? "").trim() || null });
  revalidatePath("/yomadesk/despesas");
  revalidatePath("/yomadesk/empresa");
}

export async function criarDespesa(formData: FormData) {
  const descricao = String(formData.get("descricao") ?? "").trim();
  const valor = String(formData.get("valor") ?? "").trim();
  if (!descricao || !valor) return;

  const comprovante = formData.get("comprovante");
  let comprovanteUrl: string | null = null;
  if (comprovante instanceof File && comprovante.size > 0) {
    comprovanteUrl = await enviarArquivo(comprovante, "despesas");
  }

  const dataTxt = String(formData.get("data") ?? "").trim();
  const categoriaId = String(formData.get("categoriaId") ?? "").trim() || null;
  const tagsTxt = String(formData.get("tags") ?? "").trim();

  const db = banco();
  await db.insert(despesas).values({
    descricao,
    valor,
    data: dataTxt ? new Date(dataTxt) : new Date(),
    metodoPagamento: String(formData.get("metodoPagamento") ?? "dinheiro").trim() || "dinheiro",
    categoriaId,
    fornecedor: String(formData.get("fornecedor") ?? "").trim() || null,
    pago: formData.get("pago") === "on",
    comprovanteUrl,
    tags: tagsTxt ? tagsTxt.split(",").map((t) => t.trim()).filter(Boolean) : null,
  });
  revalidatePath("/yomadesk/despesas");
}

export async function removerDespesa(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const db = banco();
  await db.delete(despesas).where(eq(despesas.id, id));
  revalidatePath("/yomadesk/despesas");
}

export async function salvarConfiguracaoFatura(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const logo = formData.get("logo");
  const anexo = formData.get("anexo");
  const db = banco();
  const atualizacao: Partial<typeof configuracaoFatura.$inferInsert> = {
    emailResposta: String(formData.get("emailResposta") ?? "").trim() || null,
    mensagemPadrao: String(formData.get("mensagemPadrao") ?? "").trim() || null,
    mensagemOrcamento: String(formData.get("mensagemOrcamento") ?? "").trim() || null,
    exibirAssinatura: formData.get("exibirAssinatura") === "on",
    nomeContaQR: String(formData.get("nomeContaQR") ?? "").trim() || null,
    referenciaPagamento: String(formData.get("referenciaPagamento") ?? "").trim() || null,
    prazoFaturaDias: Number(formData.get("prazoFaturaDias") ?? 30) || 30,
    prazoOrcamentoDias: Number(formData.get("prazoOrcamentoDias") ?? 14) || 14,
    usarPrazoPersonalizado: formData.get("usarPrazoPersonalizado") === "on",
  };
  if (logo instanceof File && logo.size > 0) {
    atualizacao.logoUrl = await enviarArquivo(logo, "logo");
  }
  if (anexo instanceof File && anexo.size > 0) {
    atualizacao.anexoPdfUrl = await enviarArquivo(anexo, "anexos");
  }

  await db.update(configuracaoFatura).set(atualizacao).where(eq(configuracaoFatura.id, id));
  revalidarEmpresa();
}
