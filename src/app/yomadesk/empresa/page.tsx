import Link from "next/link";
import MaterialIcon from "@/components/MaterialIcon";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { listarCategoriasDespesa, listarContasBancarias, obterEmpresa } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { criarCategoriaDespesa, criarContaBancaria, removerContaBancaria, salvarEmpresa } from "../actions";
import BancoNaoConfigurado from "../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

const input = "vidro-input mt-1.5 w-full px-3.5 text-sm outline-none";
const botao =
  "inline-flex h-10 items-center gap-2 rounded-xl bg-carmesim px-5 text-sm font-medium text-white shadow-sm shadow-carmesim/20 transition-all hover:bg-carmesim-escuro active:scale-[0.98]";

export default async function EmpresaPage({ searchParams }: { searchParams: Promise<{ aba?: string }> }) {
  const { t, locale } = await obterDicionarioPainel();
  const e = t.yomadesk.empresa;

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={e.titulo} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  const { aba = "dados" } = await searchParams;
  let dados, contas, categorias;
  try {
    [dados, contas, categorias] = await Promise.all([obterEmpresa(), listarContasBancarias(), listarCategoriasDespesa()]);
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <>
        <PageHeader titulo={e.titulo} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }

  const ABAS = [
    { valor: "dados", label: e.abaDados },
    { valor: "contas", label: e.abaContas },
    { valor: "categorias", label: e.abaCategorias },
  ];

  const IVA_OPCOES = [
    { valor: "normal_8_1", label: e.ivaNormal, ajuda: e.ivaNormalAjuda },
    { valor: "reduzida_2_6", label: e.ivaReduzida, ajuda: e.ivaReduzidaAjuda },
    { valor: "alojamento_3_8", label: e.ivaAlojamento, ajuda: e.ivaAlojamentoAjuda },
  ];

  return (
    <>
      <PageHeader titulo={e.titulo} />
      <div className="max-w-4xl space-y-6 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{e.subtitulo}</p>

        <div className="inline-flex max-w-xl gap-1 rounded-xl border border-black/5 bg-black/[0.03] p-1">
          {ABAS.map((item) => (
            <Link
              key={item.valor}
              href={`/yomadesk/empresa?aba=${item.valor}`}
              className={`flex-1 whitespace-nowrap rounded-lg px-4 py-1.5 text-center text-sm font-medium transition-all ${
                aba === item.valor ? "bg-white text-grafite shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "text-muted-foreground hover:text-grafite"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {aba === "dados" && (
          <section className="vidro-card space-y-6 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-base font-semibold text-grafite">{e.identificacaoTitulo}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{e.identificacaoSub}</p>
              </div>
            </div>
            <form action={salvarEmpresa} className="space-y-4">
              <input type="hidden" name="id" value={dados.id} />
              <label className="block text-sm">
                <span className="font-medium text-grafite-suave">{e.nome}</span>
                <input className={input} name="nome" defaultValue={dados.nome} />
              </label>
              <div className="grid grid-cols-4 gap-4">
                <label className="col-span-3 block text-sm">
                  <span className="font-medium text-grafite-suave">{e.rua}</span>
                  <input className={input} name="rua" defaultValue={dados.rua ?? ""} />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-grafite-suave">{e.numero}</span>
                  <input className={input} name="numero" defaultValue={dados.numero ?? ""} />
                </label>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <label className="block text-sm">
                  <span className="font-medium text-grafite-suave">{e.cep}</span>
                  <input className={input} name="cep" defaultValue={dados.cep ?? ""} />
                </label>
                <label className="col-span-3 block text-sm">
                  <span className="font-medium text-grafite-suave">{e.cidade}</span>
                  <input className={input} name="cidade" defaultValue={dados.cidade ?? ""} />
                </label>
              </div>
              <div className="space-y-2.5 pt-2">
                <div className="relative">
                  <MaterialIcon name="mail" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-grafite-suave" />
                  <input className={`${input} mt-0 pl-10`} name="email" type="email" defaultValue={dados.email ?? ""} placeholder={e.email} />
                </div>
                <div className="relative">
                  <MaterialIcon name="call" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-grafite-suave" />
                  <input className={`${input} mt-0 pl-10`} name="telefone" defaultValue={dados.telefone ?? ""} placeholder={e.telefone} />
                </div>
              </div>

              <details className="group -mx-6 border-t border-black/[0.04] sm:-mx-8">
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 transition-colors hover:bg-black/[0.02] sm:px-8">
                  <span className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-black/[0.03] text-grafite-suave">
                      <MaterialIcon name="percent" className="text-[16px]" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-grafite">{e.ivaTitulo}</span>
                      <span className="block text-sm text-muted-foreground">{e.ivaSubtitulo}</span>
                    </span>
                  </span>
                  <MaterialIcon name="expand_more" className="shrink-0 text-[16px] text-grafite-suave transition-transform group-open:rotate-180" />
                </summary>
                <div className="space-y-4 border-t border-black/[0.04] px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {IVA_OPCOES.map((op) => {
                      const ativo = dados.taxaIva === op.valor;
                      return (
                        <label
                          key={op.valor}
                          className={`flex cursor-pointer flex-col rounded-xl border p-3.5 transition-colors ${
                            ativo ? "border-carmesim/30 bg-carmesim/5" : "border-black/10 bg-white/40 hover:bg-white/80"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span className={`text-sm font-semibold ${ativo ? "text-carmesim" : "text-grafite"}`}>{op.label}</span>
                            <input type="radio" name="taxaIva" value={op.valor} defaultChecked={ativo} className="accent-carmesim" />
                          </span>
                          <span className="mt-1 text-sm text-muted-foreground">{op.ajuda}</span>
                        </label>
                      );
                    })}
                  </div>
                  <label className="flex items-start gap-2.5 text-sm">
                    <input type="checkbox" name="isentaIva" defaultChecked={dados.isentaIva} className="mt-0.5 size-4 rounded accent-carmesim" />
                    <span className="text-grafite-suave">{e.isenta}</span>
                  </label>
                </div>
              </details>

              <div className="pt-2">
                <button className={botao}>
                  <MaterialIcon name="check_circle" className="text-[16px]" /> {e.botaoSalvar}
                </button>
              </div>
            </form>
          </section>
        )}

        {aba === "contas" && (
          <section className="vidro-card space-y-4 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between pb-2">
              <div>
                <h2 className="text-base font-semibold text-grafite">{e.contasTitulo}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{e.contasSub}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-md border border-acento-azul/20 bg-acento-azul/10 px-2.5 py-1 text-xs font-medium text-acento-azul">
                <MaterialIcon name="qr_code_2" className="text-[14px]" /> {e.qrIbanPronto}
              </span>
            </div>

            <div className="space-y-3">
              {contas.map((conta) => (
                <div key={conta.id} className="flex items-center justify-between gap-3 rounded-xl border border-black/[0.06] bg-white/50 p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-black/[0.03] text-sm font-semibold text-carmesim">
                      {conta.moeda}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-grafite">{conta.banco}</span>
                        {conta.ativa && (
                          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                            {e.ativa}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {conta.iban} {conta.qrIban ? "· QR-IBAN" : ""}
                      </span>
                    </div>
                  </div>
                  <form action={removerContaBancaria}>
                    <input type="hidden" name="id" value={conta.id} />
                    <button type="submit" title={e.remover} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-black/5 hover:text-red-600">
                      <MaterialIcon name="delete" className="text-[16px]" />
                    </button>
                  </form>
                </div>
              ))}
              {contas.length === 0 && <p className="text-sm text-muted-foreground">{e.nenhumaConta}</p>}
            </div>

            <form action={criarContaBancaria} className="grid gap-4 border-t border-black/[0.04] pt-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium text-grafite-suave">{e.banco}</span>
                <input className={input} name="banco" required />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-grafite-suave">{e.moeda}</span>
                <input className={input} name="moeda" defaultValue="CHF" />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="font-medium text-grafite-suave">{e.iban}</span>
                <input className={`${input} font-mono`} name="iban" required placeholder="CH00 0000 0000 0000 0000 0" />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-grafite-suave">{e.titular}</span>
                <input className={input} name="titular" required />
              </label>
              <label className="flex items-center gap-2 pt-7 text-sm">
                <input type="checkbox" name="qrIban" className="size-4 rounded accent-carmesim" />
                <span className="text-grafite-suave">{e.qrIban}</span>
              </label>
              <div className="sm:col-span-2">
                <button className={botao}>
                  <MaterialIcon name="check_circle" className="text-[16px]" /> {e.botaoAdicionarConta}
                </button>
              </div>
            </form>
          </section>
        )}

        {aba === "categorias" && (
          <section className="vidro-card space-y-5 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
              <div>
                <h2 className="text-base font-semibold text-grafite">{e.categoriasTitulo}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{e.categoriasSub}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {categorias.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white/55 p-3.5 transition-colors hover:border-black/15">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.03] text-grafite-suave">
                    <MaterialIcon name="sell" className="text-[18px]" />
                  </span>
                  <span className="text-sm font-medium text-grafite">{c.nome}</span>
                </div>
              ))}
              {categorias.length === 0 && <p className="text-sm text-muted-foreground">{e.nenhumaCategoria}</p>}
            </div>

            <form action={criarCategoriaDespesa} className="flex flex-wrap items-center gap-2 border-t border-black/[0.04] pt-4">
              <input className={`${input} mt-0 max-w-xs`} name="nome" placeholder={e.novaCategoriaPlaceholder} required />
              <button className={botao}>
                <MaterialIcon name="sell" className="text-[16px]" /> {e.botaoAdicionarCategoria}
              </button>
            </form>
          </section>
        )}
      </div>
    </>
  );
}
