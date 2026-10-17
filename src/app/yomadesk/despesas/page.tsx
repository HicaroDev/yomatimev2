import Link from "next/link";
import MaterialIcon from "@/components/MaterialIcon";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { listarDespesas } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { removerDespesa } from "../actions";
import BancoNaoConfigurado from "../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default async function DespesasPage() {
  const { t, locale } = await obterDicionarioPainel();
  const d = t.yomadesk.despesas;

  const botaoNovaDespesa = (
    <Link
      href="/yomadesk/despesas/nova"
      className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-carmesim px-4 text-sm font-medium text-white shadow-sm shadow-carmesim/20 transition-all hover:bg-carmesim-escuro active:scale-[0.98]"
    >
      <MaterialIcon name="add" className="text-[16px]" />
      {d.botaoNovaDespesa}
    </Link>
  );

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.despesas} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  let despesas;
  try {
    despesas = await listarDespesas();
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.despesas} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }

  const total = despesas.reduce((soma, dep) => soma + Number(dep.valor), 0);

  return (
    <>
      <PageHeader titulo={d.titulo(despesas.length)} acao={botaoNovaDespesa} />
      <div className="max-w-4xl space-y-6 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{d.subtitulo}</p>

        <section className="overflow-hidden rounded-xl border border-border bg-white/75 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] backdrop-blur-[24px]">
          <div className="divide-y divide-border">
            {despesas.map((dep) => (
              <div key={dep.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-grafite">{dep.descricao}</p>
                  <p className="text-xs text-muted-foreground">
                    {dep.categoriaNome ?? d.semCategoria} · {new Date(dep.data).toLocaleDateString(locale === "it" ? "it-CH" : locale === "en" ? "en-GB" : "pt-BR")}
                    {dep.fornecedor ? ` · ${dep.fornecedor}` : ""}
                  </p>
                </div>
                {dep.tags && dep.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {dep.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[11px] text-grafite-suave">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="w-28 text-right font-medium text-grafite">CHF {Number(dep.valor).toFixed(2)}</p>
                <form action={removerDespesa}>
                  <input type="hidden" name="id" value={dep.id} />
                  <button type="submit" title={d.remover} className="text-muted-foreground transition-colors hover:text-red-600">
                    <MaterialIcon name="delete" className="text-[16px]" />
                  </button>
                </form>
              </div>
            ))}
          </div>
          {despesas.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">{d.nenhumaDespesa}</p>
          ) : (
            <p className="flex items-center justify-between border-t border-border px-4 py-2 text-sm font-medium text-grafite">
              <span>{d.totalLabel}</span>
              <span>CHF {total.toFixed(2)}</span>
            </p>
          )}
        </section>
      </div>
    </>
  );
}
