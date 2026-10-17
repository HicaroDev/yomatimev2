import { and, asc, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { banco } from "./db";
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
} from "./schema";

export async function listarClientes() {
  const db = banco();
  const linhas = await db
    .select({
      id: clientes.id,
      nome: clientes.nome,
      email: clientes.email,
      telefone: clientes.telefone,
      criadoEm: clientes.criadoEm,
      creditosTotais: sql<number>`coalesce(sum(${pacotesCredito.creditosTotais}), 0)`.mapWith(Number),
      creditosUsados: sql<number>`coalesce(sum(${pacotesCredito.creditosUsados}), 0)`.mapWith(Number),
    })
    .from(clientes)
    .leftJoin(pacotesCredito, eq(pacotesCredito.clienteId, clientes.id))
    .groupBy(clientes.id)
    .orderBy(asc(clientes.nome));
  return linhas;
}

export async function obterCliente(id: string) {
  const db = banco();
  const [cliente] = await db.select().from(clientes).where(eq(clientes.id, id));
  if (!cliente) return null;

  const pacotes = await db
    .select()
    .from(pacotesCredito)
    .where(eq(pacotesCredito.clienteId, id))
    .orderBy(asc(pacotesCredito.validadeEm), asc(pacotesCredito.compradoEm));

  const pacoteIds = pacotes.map((p) => p.id);
  const historicoConsumo = pacoteIds.length
    ? await db.select().from(consumos).where(inArray(consumos.pacoteId, pacoteIds)).orderBy(desc(consumos.data))
    : [];

  const notasFiscais = await db
    .select()
    .from(faturas)
    .where(eq(faturas.clienteId, id))
    .orderBy(desc(faturas.emitidaEm));

  return { cliente, pacotes, historicoConsumo, faturas: notasFiscais };
}

// FEFO: pega o pacote ainda com crédito sobrando que vence primeiro
// (sem validade vai por último), pra decidir qual baixar automaticamente.
export async function pacoteParaConsumir(clienteId: string) {
  const db = banco();
  const pacotes = await db
    .select()
    .from(pacotesCredito)
    .where(eq(pacotesCredito.clienteId, clienteId))
    .orderBy(sql`${pacotesCredito.validadeEm} asc nulls last`, asc(pacotesCredito.compradoEm));
  return pacotes.find((p) => p.creditosUsados < p.creditosTotais) ?? null;
}

export async function listarFaturas(status?: string) {
  const db = banco();
  const base = db
    .select({
      id: faturas.id,
      numero: faturas.numero,
      status: faturas.status,
      emitidaEm: faturas.emitidaEm,
      vencimentoEm: faturas.vencimentoEm,
      pagaEm: faturas.pagaEm,
      total: faturas.total,
      origem: faturas.origem,
      clienteNome: clientes.nome,
      clienteId: clientes.id,
    })
    .from(faturas)
    .innerJoin(clientes, eq(clientes.id, faturas.clienteId))
    .orderBy(desc(faturas.emitidaEm));
  if (status) {
    return base.where(eq(faturas.status, status as (typeof faturas.status.enumValues)[number]));
  }
  return base;
}

export async function obterFatura(id: string) {
  const db = banco();
  const [fatura] = await db
    .select({
      id: faturas.id,
      numero: faturas.numero,
      status: faturas.status,
      emitidaEm: faturas.emitidaEm,
      vencimentoEm: faturas.vencimentoEm,
      pagaEm: faturas.pagaEm,
      total: faturas.total,
      clienteNome: clientes.nome,
      clienteId: clientes.id,
      clienteRua: clientes.rua,
      clienteNumero: clientes.numero,
      clienteCep: clientes.cep,
      clienteCidade: clientes.cidade,
    })
    .from(faturas)
    .innerJoin(clientes, eq(clientes.id, faturas.clienteId))
    .where(eq(faturas.id, id));
  if (!fatura) return null;
  const itens = await db.select().from(faturaItens).where(eq(faturaItens.faturaId, id));
  return { fatura, itens };
}

export async function visaoFaturas() {
  const db = banco();
  const [linha] = await db
    .select({
      totalFaturado: sql<number>`coalesce(sum(${faturas.total}) filter (where ${faturas.status} in ('enviada','paga','vencida')), 0)`.mapWith(Number),
      aAguardar: sql<number>`coalesce(sum(${faturas.total}) filter (where ${faturas.status} = 'enviada'), 0)`.mapWith(Number),
      vencidas: sql<number>`coalesce(sum(${faturas.total}) filter (where ${faturas.status} = 'vencida'), 0)`.mapWith(Number),
      qtdEnviadas: sql<number>`count(*) filter (where ${faturas.status} = 'enviada')`.mapWith(Number),
      qtdVencidas: sql<number>`count(*) filter (where ${faturas.status} = 'vencida')`.mapWith(Number),
    })
    .from(faturas);
  return linha;
}

export async function visaoGeral() {
  const db = banco();
  const daqui30dias = new Date();
  daqui30dias.setDate(daqui30dias.getDate() + 30);

  const pacotesVencendo = await db
    .select({
      id: pacotesCredito.id,
      descricao: pacotesCredito.descricao,
      validadeEm: pacotesCredito.validadeEm,
      creditosTotais: pacotesCredito.creditosTotais,
      creditosUsados: pacotesCredito.creditosUsados,
      clienteId: clientes.id,
      clienteNome: clientes.nome,
    })
    .from(pacotesCredito)
    .innerJoin(clientes, eq(clientes.id, pacotesCredito.clienteId))
    .where(and(lte(pacotesCredito.validadeEm, daqui30dias), gte(pacotesCredito.creditosTotais, sql`${pacotesCredito.creditosUsados} + 1`)))
    .orderBy(asc(pacotesCredito.validadeEm));

  const pacotesEsgotando = await db
    .select({
      id: pacotesCredito.id,
      descricao: pacotesCredito.descricao,
      creditosTotais: pacotesCredito.creditosTotais,
      creditosUsados: pacotesCredito.creditosUsados,
      clienteId: clientes.id,
      clienteNome: clientes.nome,
    })
    .from(pacotesCredito)
    .innerJoin(clientes, eq(clientes.id, pacotesCredito.clienteId))
    .where(sql`${pacotesCredito.creditosTotais} - ${pacotesCredito.creditosUsados} <= 1 and ${pacotesCredito.creditosTotais} - ${pacotesCredito.creditosUsados} > 0`);

  const faturasEmAberto = await db
    .select({
      id: faturas.id,
      numero: faturas.numero,
      status: faturas.status,
      total: faturas.total,
      clienteNome: clientes.nome,
    })
    .from(faturas)
    .innerJoin(clientes, eq(clientes.id, faturas.clienteId))
    .where(inArray(faturas.status, ["rascunho", "enviada", "vencida"]))
    .orderBy(asc(faturas.emitidaEm));

  const [{ totalClientes }] = await db.select({ totalClientes: sql<number>`count(*)`.mapWith(Number) }).from(clientes);

  return { pacotesVencendo, pacotesEsgotando, faturasEmAberto, totalClientes };
}

// --- YomaDeskV2: empresa, contas bancárias, catálogo, despesas, personalização ---

// `empresa` e `configuracaoFatura` são linhas únicas — cria a primeira leitura sob
// demanda se ainda não existir nenhuma linha, pra sempre ter algo pra editar.
export async function obterEmpresa() {
  const db = banco();
  const [linha] = await db.select().from(empresa).limit(1);
  if (linha) return linha;
  const [nova] = await db.insert(empresa).values({}).returning();
  return nova;
}

export async function obterConfiguracaoFatura() {
  const db = banco();
  const [linha] = await db.select().from(configuracaoFatura).limit(1);
  if (linha) return linha;
  const [nova] = await db.insert(configuracaoFatura).values({}).returning();
  return nova;
}

export async function listarContasBancarias() {
  const db = banco();
  return db.select().from(contasBancarias).orderBy(desc(contasBancarias.ativa), asc(contasBancarias.banco));
}

export async function obterContaBancariaAtiva(moeda = "CHF") {
  const db = banco();
  const [conta] = await db
    .select()
    .from(contasBancarias)
    .where(and(eq(contasBancarias.ativa, true), eq(contasBancarias.moeda, moeda)))
    .limit(1);
  return conta ?? null;
}

export async function listarItensCatalogo(tipo?: string) {
  const db = banco();
  const base = db.select().from(itensCatalogo).orderBy(asc(itensCatalogo.descricao));
  if (tipo) {
    return base.where(eq(itensCatalogo.tipo, tipo as (typeof itensCatalogo.tipo.enumValues)[number]));
  }
  return base;
}

export async function listarCategoriasDespesa() {
  const db = banco();
  return db.select().from(categoriasDespesa).orderBy(asc(categoriasDespesa.nome));
}

export async function listarDespesas() {
  const db = banco();
  return db
    .select({
      id: despesas.id,
      descricao: despesas.descricao,
      valor: despesas.valor,
      metodoPagamento: despesas.metodoPagamento,
      fornecedor: despesas.fornecedor,
      data: despesas.data,
      pago: despesas.pago,
      comprovanteUrl: despesas.comprovanteUrl,
      tags: despesas.tags,
      categoriaNome: categoriasDespesa.nome,
    })
    .from(despesas)
    .leftJoin(categoriasDespesa, eq(categoriasDespesa.id, despesas.categoriaId))
    .orderBy(desc(despesas.data));
}

export async function visaoAnalises() {
  const db = banco();
  const porMes = await db
    .select({
      mes: sql<string>`to_char(${faturas.emitidaEm}, 'YYYY-MM')`,
      total: sql<number>`coalesce(sum(${faturas.total}) filter (where ${faturas.status} in ('enviada','paga','vencida')), 0)`.mapWith(Number),
    })
    .from(faturas)
    .groupBy(sql`to_char(${faturas.emitidaEm}, 'YYYY-MM')`)
    .orderBy(sql`to_char(${faturas.emitidaEm}, 'YYYY-MM') desc`)
    .limit(12);

  const porCliente = await db
    .select({
      clienteNome: clientes.nome,
      total: sql<number>`coalesce(sum(${faturas.total}), 0)`.mapWith(Number),
    })
    .from(faturas)
    .innerJoin(clientes, eq(clientes.id, faturas.clienteId))
    .where(inArray(faturas.status, ["enviada", "paga", "vencida"]))
    .groupBy(clientes.id, clientes.nome)
    .orderBy(sql`coalesce(sum(${faturas.total}), 0) desc`)
    .limit(5);

  const porStatus = await db
    .select({ status: faturas.status, qtd: sql<number>`count(*)`.mapWith(Number) })
    .from(faturas)
    .groupBy(faturas.status);

  return { porMes: porMes.reverse(), porCliente, porStatus };
}
