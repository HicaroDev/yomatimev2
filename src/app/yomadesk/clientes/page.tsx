import Link from "next/link";
import MaterialIcon from "@/components/MaterialIcon";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { listarClientes } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { criarCliente } from "../actions";
import BancoNaoConfigurado from "../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";
import Avatar from "../Avatar";

export const dynamic = "force-dynamic";

const input = "vidro-input mt-1.5 w-full px-3.5 text-sm outline-none";
const botao =
  "inline-flex h-10 items-center gap-2 rounded-xl bg-carmesim px-5 text-sm font-medium text-white shadow-sm shadow-carmesim/20 transition-all hover:bg-carmesim-escuro active:scale-[0.98]";

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ importados?: string; q?: string; aba?: string; novo?: string }>;
}) {
  const { locale, t } = await obterDicionarioPainel();
  const c = t.yomadesk.clientes;

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.clientes} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  const { importados, q = "", aba = "", novo } = await searchParams;
  let clientes;
  try {
    clientes = await listarClientes();
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.clientes} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }

  const comCredito = clientes.filter((cli) => cli.creditosTotais - cli.creditosUsados > 0);
  const semCredito = clientes.filter((cli) => cli.creditosTotais - cli.creditosUsados <= 0);
  const base = aba === "com-credito" ? comCredito : aba === "sem-credito" ? semCredito : clientes;
  const termo = q.trim().toLowerCase();
  const filtrados = termo
    ? base.filter((cli) => [cli.nome, cli.telefone, cli.email].some((v) => v?.toLowerCase().includes(termo)))
    : base;

  const paramsBase = new URLSearchParams();
  if (q) paramsBase.set("q", q);
  if (aba) paramsBase.set("aba", aba);
  const hrefSemDrawer = `/yomadesk/clientes${paramsBase.size ? `?${paramsBase}` : ""}`;
  const paramsComNovo = new URLSearchParams(paramsBase);
  paramsComNovo.set("novo", "1");
  const hrefComDrawer = `/yomadesk/clientes?${paramsComNovo}`;

  return (
    <>
      <PageHeader
        titulo={c.titulo(clientes.length)}
        acao={
          <Link href={hrefComDrawer} className={botao}>
            <MaterialIcon name="person_add" className="text-[16px]" /> {c.novoClienteTitulo}
          </Link>
        }
      />
      <div className="max-w-4xl space-y-6 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{c.subtitulo}</p>

        {importados && (
          <div className="rounded-lg border border-carmesim/40 bg-carmesim/10 p-3 text-sm text-carmesim">{c.importados(Number(importados))}</div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex flex-wrap gap-2 text-sm">
            {[
              { valor: "", label: c.abaTodos(clientes.length) },
              { valor: "com-credito", label: c.abaComCredito(comCredito.length) },
              { valor: "sem-credito", label: c.abaSemCredito(semCredito.length) },
            ].map((item) => (
              <Link
                key={item.valor}
                href={item.valor ? `/yomadesk/clientes?aba=${item.valor}` : "/yomadesk/clientes"}
                className={`rounded-full border px-3 py-1 transition-colors ${
                  aba === item.valor ? "border-carmesim bg-carmesim/10 text-carmesim" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form className="relative w-full max-w-xs sm:w-56" action="/yomadesk/clientes" method="get">
            {aba && <input type="hidden" name="aba" value={aba} />}
            <MaterialIcon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-muted-foreground" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder={c.buscaPlaceholder}
              className="w-full rounded-lg border border-black/[0.08] bg-white/50 py-2 pl-9 pr-3 text-sm outline-none backdrop-blur-[8px] transition-colors focus:border-carmesim focus:bg-white/95 focus:ring-2 focus:ring-carmesim/15"
            />
          </form>
        </div>

        <section className="vidro-card overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2 font-medium">{c.colCliente}</th>
                  <th className="px-4 py-2 font-medium">{c.colCreditos}</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtrados.map((cli) => (
                  <tr key={cli.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <Link href={`/yomadesk/clientes/${cli.id}`} className="flex items-center gap-3">
                        <Avatar nome={cli.nome} tamanho="size-9" />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-grafite">{cli.nome}</p>
                          <p className="truncate text-xs text-muted-foreground">{cli.telefone || cli.email || c.semContato}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-carmesim/10 px-2.5 py-0.5 text-xs font-medium text-carmesim">
                        {cli.creditosTotais - cli.creditosUsados} / {cli.creditosTotais}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/yomadesk/clientes/${cli.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
                        <MaterialIcon name="chevron_right" className="text-[16px]" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtrados.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">{c.nenhumCliente}</p>
          ) : (
            <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">{c.mostrando(filtrados.length, clientes.length)}</p>
          )}
        </section>
      </div>

      {novo && (
        <>
          <Link href={hrefSemDrawer} aria-hidden className="fixed inset-0 z-20 bg-grafite/30 backdrop-blur-[1px]" />
          <aside className="fixed inset-y-0 right-0 z-30 flex w-full max-w-[420px] flex-col border-l border-white/90 bg-white/90 shadow-[0_20px_48px_-8px_rgba(15,23,42,0.08),0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-[32px]">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
              <h2 className="text-base font-semibold text-foreground">{c.novoClienteTitulo}</h2>
              <Link href={hrefSemDrawer} className="text-muted-foreground transition-colors hover:text-foreground">
                <MaterialIcon name="close" className="text-[16px]" />
              </Link>
            </div>
            <form action={criarCliente} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              <label className="block text-sm">
                <span className="text-grafite/70">{c.nome}</span>
                <input className={input} name="nome" required autoFocus />
              </label>
              <label className="block text-sm">
                <span className="text-grafite/70">{c.telefone}</span>
                <input className={input} name="telefone" />
              </label>
              <label className="block text-sm">
                <span className="text-grafite/70">{c.email}</span>
                <input className={input} name="email" type="email" />
              </label>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <label className="block text-sm">
                  <span className="text-grafite/70">{c.rua}</span>
                  <input className={input} name="rua" />
                </label>
                <label className="block text-sm">
                  <span className="text-grafite/70">{c.numero}</span>
                  <input className={input} name="numero" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block text-sm">
                  <span className="text-grafite/70">{c.cep}</span>
                  <input className={input} name="cep" />
                </label>
                <label className="block text-sm">
                  <span className="text-grafite/70">{c.cidade}</span>
                  <input className={input} name="cidade" />
                </label>
              </div>
              <label className="block text-sm">
                <span className="text-grafite/70">
                  {c.uidIde} <span className="font-normal text-muted-foreground">({c.uidIdeAjuda})</span>
                </span>
                <input className={`${input} font-mono`} name="uidIde" placeholder="CHE-000.000.000" />
              </label>
              <label className="block text-sm">
                <span className="text-grafite/70">{c.notas}</span>
                <input className={input} name="notas" />
              </label>
              <label className="block text-sm">
                <span className="text-grafite/70">{c.notaPrivada}</span>
                <input className={input} name="notaPrivada" />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="portalB2bHabilitado" className="size-4 rounded accent-carmesim" />
                <span className="text-grafite/70">{c.portalB2b}</span>
              </label>
              <div className="flex items-center gap-2 pt-2">
                <button className={botao}>
                  <MaterialIcon name="person_add" className="text-[16px]" /> {c.botaoCadastrar}
                </button>
                <Link href={hrefSemDrawer} className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {c.cancelar}
                </Link>
              </div>
            </form>
          </aside>
        </>
      )}
    </>
  );
}
