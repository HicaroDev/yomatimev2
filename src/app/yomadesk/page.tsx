import Link from "next/link";
import MaterialIcon from "@/components/MaterialIcon";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { visaoGeral } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import BancoNaoConfigurado from "./BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "./StatusBadge";

export const dynamic = "force-dynamic";

function Stat({
  icone,
  valor,
  rotulo,
  cor,
}: {
  icone: string;
  valor: number;
  rotulo: string;
  cor: "indigo" | "azul" | "carmesim";
}) {
  const chip = {
    indigo: "bg-acento-indigo/12 text-acento-indigo",
    azul: "bg-acento-azul/12 text-acento-azul",
    carmesim: "bg-carmesim/12 text-carmesim",
  }[cor];
  return (
    <div className="vidro-card rounded-2xl p-6 sm:p-8">
      <div className="flex items-start justify-between">
        <p className="text-3xl font-semibold tabular-nums text-grafite">{valor}</p>
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${chip}`}>
          <MaterialIcon name={icone} className="text-[18px]" />
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{rotulo}</p>
    </div>
  );
}

export default async function YomaDeskDashboard() {
  const { locale, t, tagData } = await obterDicionarioPainel();
  const d = t.yomadesk.dashboard;

  function formatarData(data: Date | string | null) {
    if (!data) return "—";
    return new Date(data).toLocaleDateString(tagData);
  }

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={t.yomadesk.marca} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  let visao;
  try {
    visao = await visaoGeral();
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <>
        <PageHeader titulo={t.yomadesk.marca} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }
  const { pacotesVencendo, pacotesEsgotando, faturasEmAberto, totalClientes } = visao;

  return (
    <>
      <PageHeader titulo={t.yomadesk.marca} />
      <div className="max-w-4xl space-y-8 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{d.subtitulo}</p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat icone="groups" valor={totalClientes} rotulo={d.statClientes} cor="indigo" />
          <Stat icone="receipt_long" valor={faturasEmAberto.length} rotulo={d.statFaturasAbertas} cor="azul" />
          <Stat icone="warning" valor={pacotesEsgotando.length} rotulo={d.statPacotesEsgotando} cor="carmesim" />
        </div>

        <section className="vidro-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-grafite">{d.pacotesVencendoTitulo}</h2>
          {pacotesVencendo.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">{d.nenhumPacoteVencendo}</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {pacotesVencendo.map((p) => (
                <li key={p.id} className="flex items-center justify-between border-t border-border pt-2 first:border-0 first:pt-0">
                  <span>
                    <Link href={`/yomadesk/clientes/${p.clienteId}`} className="font-medium text-grafite hover:text-carmesim">
                      {p.clienteNome}
                    </Link>{" "}
                    — {p.descricao} {d.creditoRestando(p.creditosTotais - p.creditosUsados)}
                  </span>
                  <span className="text-muted-foreground">{d.vence(formatarData(p.validadeEm))}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="vidro-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-grafite">{d.pacotesEsgotandoTitulo}</h2>
          {pacotesEsgotando.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">{d.nenhumPacoteLimite}</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {pacotesEsgotando.map((p) => (
                <li key={p.id} className="border-t border-border pt-2 first:border-0 first:pt-0">
                  <Link href={`/yomadesk/clientes/${p.clienteId}`} className="font-medium text-grafite hover:text-carmesim">
                    {p.clienteNome}
                  </Link>{" "}
                  — {p.descricao} {d.creditoRestandoSimples(p.creditosTotais - p.creditosUsados)}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="vidro-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-grafite">{d.faturasAbertoTitulo}</h2>
          {faturasEmAberto.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">{d.nenhumaFaturaAberta}</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {faturasEmAberto.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-3 border-t border-border pt-2 first:border-0 first:pt-0">
                  <span className="flex items-center gap-2">
                    {f.numero} — {f.clienteNome}
                    <StatusBadge status={f.status} locale={locale} />
                  </span>
                  <span className="text-muted-foreground">CHF {f.total}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
