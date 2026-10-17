import Link from "next/link";
import MaterialIcon from "@/components/MaterialIcon";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { listarCategoriasDespesa } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { criarDespesa } from "../../actions";
import BancoNaoConfigurado from "../../BancoNaoConfigurado";
import ComprovanteInput from "./ComprovanteInput";

export const dynamic = "force-dynamic";

const input = "vidro-input mt-1.5 w-full px-3.5 text-sm outline-none";

export default async function NovaDespesaPage() {
  const { t, locale } = await obterDicionarioPainel();
  const d = t.yomadesk.despesas;
  const n = d.nova;

  if (!bancoConfigurado) {
    return (
      <div className="max-w-4xl px-4 py-8 sm:px-8">
        <BancoNaoConfigurado locale={locale} />
      </div>
    );
  }

  let categorias;
  try {
    categorias = await listarCategoriasDespesa();
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <div className="max-w-4xl px-4 py-8 sm:px-8">
        <BancoNaoConfigurado tabelasFaltando locale={locale} />
      </div>
    );
  }

  const METODOS = [
    { valor: "dinheiro", label: d.metodoDinheiro },
    { valor: "transferencia", label: d.metodoTransferencia },
    { valor: "cartao", label: d.metodoCartao },
    { valor: "twint", label: d.metodoTwint },
    { valor: "outro", label: d.metodoOutro },
  ];

  return (
    <form action={criarDespesa} className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-[16px] sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/yomadesk/despesas"
            aria-label={n.voltar}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <MaterialIcon name="arrow_back" className="text-[18px]" />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="truncate text-base font-semibold text-foreground">{n.tituloPagina}</h1>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{n.rascunho}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="inline-flex items-center rounded-full border border-border bg-white/70 p-0.5 text-xs font-medium">
            <label className="cursor-pointer">
              <input type="radio" name="pago" value="on" defaultChecked className="peer sr-only" />
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-muted-foreground transition-colors peer-checked:bg-emerald-100 peer-checked:text-emerald-700">
                <span className="size-1.5 rounded-full bg-current" />
                {n.statusPago}
              </span>
            </label>
            <label className="cursor-pointer">
              <input type="radio" name="pago" value="nao" className="peer sr-only" />
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-muted-foreground transition-colors peer-checked:bg-amber-100 peer-checked:text-amber-700">
                <span className="size-1.5 rounded-full bg-current" />
                {n.statusAPagar}
              </span>
            </label>
          </div>
          <span className="hidden items-center rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground sm:inline-flex">
            {n.recorrenciaUmaVez}
          </span>
          <button
            type="submit"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-carmesim px-4 text-sm font-medium text-white shadow-sm shadow-carmesim/20 transition-all hover:bg-carmesim-escuro active:scale-[0.98]"
          >
            <MaterialIcon name="check_circle" className="text-[18px]" />
            {n.botaoGuardar}
          </button>
        </div>
      </header>

      <div className="grid flex-1 gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-grafite">{n.documentosTitulo}</h2>
          <ComprovanteInput
            titulo={n.digitalizeTitulo}
            texto={n.digitalizeTexto}
            botaoGaleria={n.botaoGaleria}
            botaoDocumentos={n.botaoDocumentos}
            formatosSuportados={n.formatosSuportados}
          />
          <div className="vidro-card flex items-start gap-3 rounded-2xl p-4">
            <MaterialIcon name="verified_user" className="mt-0.5 shrink-0 text-[18px] text-grafite-suave" />
            <div>
              <p className="text-sm font-semibold text-grafite">{n.conformidadeTitulo}</p>
              <p className="text-xs text-muted-foreground">{n.conformidadeTexto}</p>
            </div>
          </div>
        </section>

        <section className="vidro-card space-y-5 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-grafite">{n.detalhesTitulo}</h2>
            <span className="text-xs text-muted-foreground">{n.moeda}</span>
          </div>

          <div className="border-b border-black/[0.06] pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-grafite/70">{d.valor}</span>
              <span className="text-[11px] text-muted-foreground">{n.ivaIncluido}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-medium text-grafite-suave">CHF</span>
              <input
                name="valor"
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                className="w-full border-none bg-transparent text-4xl font-semibold text-grafite outline-none placeholder:text-grafite/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>

          <label className="block text-sm">
            <span className="flex items-center gap-1.5 text-grafite/70">
              {d.descricao} <span className="text-carmesim">*</span>
            </span>
            <span className="relative mt-1.5 block">
              <MaterialIcon name="notes" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[16px] text-muted-foreground" />
              <input name="descricao" required className={`${input} mt-0 pr-9`} />
            </span>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-grafite/70">{d.metodoPagamento}</span>
              <select name="metodoPagamento" defaultValue="dinheiro" className={input}>
                {METODOS.map((m) => (
                  <option key={m.valor} value={m.valor}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="text-grafite/70">{d.data}</span>
              <input name="data" type="date" className={input} />
            </label>
          </div>

          <label className="block text-sm">
            <span className="flex items-center justify-between text-grafite/70">
              {d.categoria}
              <Link href="/yomadesk/despesas" className="text-xs font-medium text-carmesim">
                {n.novaCategoria}
              </Link>
            </span>
            <select name="categoriaId" defaultValue="" className={input}>
              <option value="">{d.semCategoria}</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="text-grafite/70">{d.fornecedor}</span>
            <span className="relative mt-1.5 block">
              <MaterialIcon name="storefront" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-muted-foreground" />
              <input name="fornecedor" className={`${input} mt-0 pl-9`} />
            </span>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
            <label className="flex min-w-0 flex-1 items-center gap-2 text-xs">
              <span className="shrink-0 text-grafite/70">{d.tags}:</span>
              <input
                name="tags"
                placeholder={d.tagsAjuda}
                className="min-w-0 flex-1 border-none bg-transparent text-xs text-grafite outline-none placeholder:text-muted-foreground"
              />
            </label>
            <Link href="/yomadesk/despesas" className="shrink-0 text-xs font-medium text-muted-foreground hover:text-red-600">
              {n.descartar}
            </Link>
          </div>
        </section>
      </div>

      <p className="px-4 pb-4 text-xs text-muted-foreground sm:px-8">{n.rodapeRascunho}</p>
    </form>
  );
}
