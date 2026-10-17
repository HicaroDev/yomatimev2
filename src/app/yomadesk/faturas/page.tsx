import Link from "next/link";
import MaterialIcon from "@/components/MaterialIcon";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { listarFaturas, visaoFaturas } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { atualizarStatusFatura } from "../actions";
import BancoNaoConfigurado from "../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";
import Avatar from "../Avatar";
import StatusBadge from "../StatusBadge";

export const dynamic = "force-dynamic";

const PROXIMO_STATUS: Record<string, string> = {
  rascunho: "enviada",
  enviada: "paga",
  vencida: "paga",
};

function pagoDe(total: string, status: string) {
  return status === "paga" || status === "arquivada" ? total : "0.00";
}

export default async function FaturasPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { locale, t, tagData } = await obterDicionarioPainel();
  const f = t.yomadesk.faturas;
  const ABAS = [
    { valor: "", label: f.abas.todas },
    { valor: "rascunho", label: f.abas.rascunho },
    { valor: "enviada", label: f.abas.enviada },
    { valor: "paga", label: f.abas.paga },
    { valor: "vencida", label: f.abas.vencida },
    { valor: "arquivada", label: f.abas.arquivada },
  ];

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.faturas} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  const { status = "" } = await searchParams;
  let faturas, visao;
  try {
    [faturas, visao] = await Promise.all([listarFaturas(status || undefined), visaoFaturas()]);
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.faturas} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader titulo={f.titulo(faturas.length)} />
      <div className="max-w-4xl space-y-6 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{f.subtitulo}</p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="vidro-card flex items-start justify-between rounded-xl p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.statTotalFaturado}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-grafite">CHF {visao.totalFaturado.toFixed(2)}</p>
            </div>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-acento-azul/12 text-acento-azul">
              <MaterialIcon name="account_balance" className="text-[18px]" />
            </span>
          </div>
          <div className="vidro-card flex items-start justify-between rounded-xl p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.statAguardando}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-acento-azul">CHF {visao.aAguardar.toFixed(2)}</p>
            </div>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-acento-azul/12 text-acento-azul">
              <MaterialIcon name="schedule" className="text-[18px]" />
            </span>
          </div>
          <div className="vidro-card flex items-start justify-between rounded-xl p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.statVencidas}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-carmesim">CHF {visao.vencidas.toFixed(2)}</p>
            </div>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-carmesim/12 text-carmesim">
              <MaterialIcon name="warning" className="text-[18px]" />
            </span>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2 text-sm">
          {ABAS.map((aba) => (
            <Link
              key={aba.valor}
              href={aba.valor ? `/yomadesk/faturas?status=${aba.valor}` : "/yomadesk/faturas"}
              className={`rounded-full border px-3 py-1 transition-colors ${
                status === aba.valor ? "border-carmesim bg-carmesim/10 text-carmesim" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {aba.label}
            </Link>
          ))}
        </nav>

        <section className="vidro-card overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">{f.colFatura}</th>
                  <th className="px-4 py-2.5 font-medium">{f.colCliente}</th>
                  <th className="px-4 py-2.5 font-medium">{f.colEmissao}</th>
                  <th className="px-4 py-2.5 font-medium">{f.colVencimento}</th>
                  <th className="px-4 py-2.5 font-medium text-right">{f.colMontante}</th>
                  <th className="px-4 py-2.5 font-medium">{f.colEstado}</th>
                  <th className="px-4 py-2.5 font-medium text-right">{f.colAcoes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {faturas.map((fat) => (
                  <tr key={fat.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium text-grafite">{fat.numero}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar nome={fat.clienteNome} />
                        <Link href={`/yomadesk/clientes/${fat.clienteId}`} className="truncate font-medium text-grafite hover:text-carmesim">
                          {fat.clienteNome}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(fat.emitidaEm).toLocaleDateString(tagData)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {fat.vencimentoEm ? new Date(fat.vencimentoEm).toLocaleDateString(tagData) : f.semVencimento}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-grafite">
                      {pagoDe(fat.total, fat.status)} <span className="text-muted-foreground">/ {fat.total}</span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={fat.status} locale={locale} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/yomadesk/faturas/${fat.id}/qrbill`}
                          target="_blank"
                          title={f.baixarQrBill}
                          className="text-muted-foreground transition-colors hover:text-carmesim"
                        >
                          <MaterialIcon name="qr_code_2" className="text-[16px]" />
                        </Link>
                        {PROXIMO_STATUS[fat.status] && (
                          <form action={atualizarStatusFatura}>
                            <input type="hidden" name="id" value={fat.id} />
                            <input type="hidden" name="status" value={PROXIMO_STATUS[fat.status]} />
                            <button className="whitespace-nowrap text-xs uppercase tracking-wide text-carmesim hover:underline">
                              {f.marcarComo((t.yomadesk.status as Record<string, string>)[PROXIMO_STATUS[fat.status]])}
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {faturas.length === 0 && <p className="px-4 py-10 text-center text-sm text-muted-foreground">{f.nenhumaFatura}</p>}
        </section>
      </div>
    </>
  );
}
