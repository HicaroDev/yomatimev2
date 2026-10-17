import { notFound } from "next/navigation";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { obterCliente } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { atualizarCliente, criarFatura, criarPacote, registrarAula } from "../../actions";
import BancoNaoConfigurado from "../../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";
import Avatar from "../../Avatar";
import StatusBadge from "../../StatusBadge";

export const dynamic = "force-dynamic";

const input = "vidro-input mt-1.5 w-full px-3.5 text-sm outline-none";
const botao =
  "inline-flex h-10 items-center gap-2 rounded-xl bg-carmesim px-5 text-sm font-medium text-white shadow-sm shadow-carmesim/20 transition-all hover:bg-carmesim-escuro active:scale-[0.98]";

export default async function ClienteDetalhePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erro?: string }>;
}) {
  const { locale, t, tagData } = await obterDicionarioPainel();
  const c = t.yomadesk.clienteDetalhe;
  const cl = t.yomadesk.clientes;

  function formatarData(data: Date | string | null) {
    if (!data) return "—";
    return new Date(data).toLocaleDateString(tagData);
  }

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

  const { id } = await params;
  const { erro } = await searchParams;
  let dados;
  try {
    dados = await obterCliente(id);
  } catch (e) {
    if (!tabelaNaoExiste(e)) throw e;
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.clientes} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }
  if (!dados) notFound();
  const { cliente, pacotes, historicoConsumo, faturas } = dados;

  return (
    <>
      <PageHeader titulo={cliente.nome} />
      <div className="max-w-4xl space-y-8 px-4 py-8 sm:px-8">
        <div className="flex items-center gap-3">
          <Avatar nome={cliente.nome} tamanho="size-11" className="text-sm" />
          <p className="text-sm text-muted-foreground">{cliente.telefone || cliente.email || c.semContato}</p>
        </div>

        {erro === "sem-credito" && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">{c.erroSemCredito}</div>
      )}

      <section className="vidro-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-grafite">{c.dadosTitulo}</h2>
        <form action={atualizarCliente} className="mt-3 grid gap-3 sm:grid-cols-2">
          <input type="hidden" name="id" value={cliente.id} />
          <label className="block text-sm">
            <span className="text-grafite/70">{c.nome}</span>
            <input className={input} name="nome" defaultValue={cliente.nome} required />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{c.telefone}</span>
            <input className={input} name="telefone" defaultValue={cliente.telefone ?? ""} />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{c.email}</span>
            <input className={input} name="email" type="email" defaultValue={cliente.email ?? ""} />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{cl.rua}</span>
            <input className={input} name="rua" defaultValue={cliente.rua ?? ""} />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{cl.numero}</span>
            <input className={input} name="numero" defaultValue={cliente.numero ?? ""} />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{cl.cep}</span>
            <input className={input} name="cep" defaultValue={cliente.cep ?? ""} />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{cl.cidade}</span>
            <input className={input} name="cidade" defaultValue={cliente.cidade ?? ""} />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{cl.uidIde}</span>
            <input className={`${input} font-mono`} name="uidIde" defaultValue={cliente.uidIde ?? ""} placeholder="CHE-000.000.000" />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{c.notas}</span>
            <input className={input} name="notas" defaultValue={cliente.notas ?? ""} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-grafite/70">{cl.notaPrivada}</span>
            <input className={input} name="notaPrivada" defaultValue={cliente.notaPrivada ?? ""} />
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" name="portalB2bHabilitado" defaultChecked={cliente.portalB2bHabilitado} className="size-4 rounded accent-carmesim" />
            <span className="text-grafite/70">{cl.portalB2b}</span>
          </label>
          <div className="sm:col-span-2">
            <button className={botao}>{c.botaoSalvar}</button>
          </div>
        </form>
      </section>

      <section className="vidro-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-grafite">{c.registrarAulaTitulo}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{c.registrarAulaSub}</p>
        <form action={registrarAula} className="mt-3 flex flex-wrap items-end gap-3">
          <input type="hidden" name="clienteId" value={cliente.id} />
          <label className="block text-sm">
            <span className="text-grafite/70">{c.servico}</span>
            <input className={input} name="servico" placeholder="Pilates Mat" required />
          </label>
          <label className="block flex-1 text-sm">
            <span className="text-grafite/70">{c.notaOpcional}</span>
            <input className={input} name="nota" />
          </label>
          <button className={botao}>{c.botaoRegistrar}</button>
        </form>
      </section>

      <section className="vidro-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-grafite">{c.pacotesTitulo}</h2>
        <form action={criarPacote} className="mt-3 grid gap-3 sm:grid-cols-2">
          <input type="hidden" name="clienteId" value={cliente.id} />
          <label className="block text-sm">
            <span className="text-grafite/70">{c.descricao}</span>
            <input className={input} name="descricao" placeholder="Pacote 10 aulas" required />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{c.creditosTotais}</span>
            <input className={input} name="creditosTotais" type="number" min={1} required />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{c.preco}</span>
            <input className={input} name="preco" type="number" step="0.01" />
          </label>
          <label className="block text-sm">
            <span className="text-grafite/70">{c.validade}</span>
            <input className={input} name="validadeEm" type="date" />
          </label>
          <div className="sm:col-span-2">
            <button className={botao}>{c.botaoAdicionarPacote}</button>
          </div>
        </form>

        <ul className="mt-4 space-y-2 text-sm">
          {pacotes.map((p) => (
            <li key={p.id} className="flex items-center justify-between border-t border-border pt-2 first:border-0 first:pt-0">
              <span>
                {p.descricao} — {p.creditosTotais - p.creditosUsados}/{p.creditosTotais} {c.creditosSufixo}
              </span>
              <span className="text-muted-foreground">{c.validadeTexto(formatarData(p.validadeEm))}</span>
            </li>
          ))}
          {pacotes.length === 0 && <li className="text-muted-foreground">{c.nenhumPacote}</li>}
        </ul>
      </section>

      <section className="vidro-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-grafite">{c.historicoTitulo}</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {historicoConsumo.map((h) => (
            <li key={h.id} className="flex justify-between border-t border-border pt-1.5 first:border-0 first:pt-0">
              <span>{h.servico}</span>
              <span className="text-muted-foreground">{formatarData(h.data)}</span>
            </li>
          ))}
          {historicoConsumo.length === 0 && <li className="text-muted-foreground">{c.nenhumConsumo}</li>}
        </ul>
      </section>

      <section className="vidro-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-grafite">{c.novaFaturaTitulo}</h2>
        <form action={criarFatura} className="mt-3 space-y-3">
          <input type="hidden" name="clienteId" value={cliente.id} />
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-[1fr_120px_120px]">
              <input className={input} name="itemDescricao" placeholder={c.itemDescricaoPlaceholder} />
              <input className={input} name="itemQuantidade" type="number" min={1} defaultValue={1} placeholder={c.qtdPlaceholder} />
              <input className={input} name="itemValor" type="number" step="0.01" placeholder={c.valorPlaceholder} />
            </div>
          ))}
          <button className={botao}>{c.botaoCriarFatura}</button>
        </form>

        <ul className="mt-4 space-y-2 text-sm">
          {faturas.map((f) => (
            <li key={f.id} className="flex items-center justify-between gap-3 border-t border-border pt-2 first:border-0 first:pt-0">
              <span className="flex items-center gap-2">
                {f.numero}
                <StatusBadge status={f.status} locale={locale} />
              </span>
              <span className="text-muted-foreground">CHF {f.total}</span>
            </li>
          ))}
          {faturas.length === 0 && <li className="text-muted-foreground">{c.nenhumaFatura}</li>}
        </ul>
      </section>
      </div>
    </>
  );
}
