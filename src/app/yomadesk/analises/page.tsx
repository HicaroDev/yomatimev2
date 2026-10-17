import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { visaoAnalises } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import BancoNaoConfigurado from "../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "../StatusBadge";

export const dynamic = "force-dynamic";

export default async function AnalisesPage() {
  const { t, locale } = await obterDicionarioPainel();
  const a = t.yomadesk.analises;

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={a.titulo} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  let visao;
  try {
    visao = await visaoAnalises();
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <>
        <PageHeader titulo={a.titulo} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }
  const { porMes, porCliente, porStatus } = visao;
  const maiorMes = Math.max(1, ...porMes.map((m) => m.total));

  return (
    <>
      <PageHeader titulo={a.titulo} />
      <div className="max-w-4xl space-y-6 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{a.subtitulo}</p>

        <section className="rounded-xl border border-border bg-white/75 p-5 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] backdrop-blur-[24px]">
          <h2 className="text-lg font-semibold text-grafite">{a.faturamentoPorMesTitulo}</h2>
          {porMes.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">{a.nenhumDado}</p>
          ) : (
            <div className="mt-4 flex items-end gap-2" style={{ height: 140 }}>
              {porMes.map((m) => (
                <div key={m.mes} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-carmesim/70"
                    style={{ height: `${Math.max(4, (m.total / maiorMes) * 110)}px` }}
                    title={`CHF ${m.total.toFixed(2)}`}
                  />
                  <span className="text-[10px] text-muted-foreground">{m.mes.slice(5)}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-xl border border-border bg-white/75 p-5 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] backdrop-blur-[24px]">
            <h2 className="text-lg font-semibold text-grafite">{a.topClientesTitulo}</h2>
            {porCliente.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">{a.nenhumCliente}</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {porCliente.map((c) => (
                  <li key={c.clienteNome} className="flex items-center justify-between border-t border-border pt-2 first:border-0 first:pt-0">
                    <span className="text-grafite">{c.clienteNome}</span>
                    <span className="font-medium text-grafite">CHF {c.total.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-xl border border-border bg-white/75 p-5 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] backdrop-blur-[24px]">
            <h2 className="text-lg font-semibold text-grafite">{a.porStatusTitulo}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {porStatus.map((s) => (
                <li key={s.status} className="flex items-center justify-between border-t border-border pt-2 first:border-0 first:pt-0">
                  <StatusBadge status={s.status} locale={locale} />
                  <span className="font-medium text-grafite">{s.qtd}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
