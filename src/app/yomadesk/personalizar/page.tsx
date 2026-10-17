import MaterialIcon from "@/components/MaterialIcon";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { obterConfiguracaoFatura } from "@/lib/yomadesk/queries";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { salvarConfiguracaoFatura } from "../actions";
import BancoNaoConfigurado from "../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

const input = "vidro-input mt-1.5 w-full px-3.5 text-sm outline-none";
const botao =
  "inline-flex h-10 items-center gap-2 rounded-xl bg-carmesim px-5 text-sm font-medium text-white shadow-sm shadow-carmesim/20 transition-all hover:bg-carmesim-escuro active:scale-[0.98]";

function TituloSecao({ icone, titulo, sub }: { icone: string; titulo: string; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.03] text-grafite-suave">
        <MaterialIcon name={icone} className="text-[16px]" />
      </span>
      <span>
        <p className="font-medium text-grafite">{titulo}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{sub}</p>
      </span>
    </div>
  );
}

export default async function PersonalizarFaturaPage() {
  const { t, locale } = await obterDicionarioPainel();
  const p = t.yomadesk.personalizar;

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={p.titulo} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  let config;
  try {
    config = await obterConfiguracaoFatura();
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return (
      <>
        <PageHeader titulo={p.titulo} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado tabelasFaltando locale={locale} />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader titulo={p.titulo} />
      <div className="max-w-4xl space-y-6 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{p.subtitulo}</p>

        <section className="space-y-6 rounded-xl border border-border bg-white/75 p-5 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] backdrop-blur-[24px] sm:p-7">
          <form action={salvarConfiguracaoFatura} className="space-y-6">
            <input type="hidden" name="id" value={config.id} />

            <div className="border-b border-black/[0.06] pb-6">
              <TituloSecao icone="image" titulo={p.logoTitulo} sub={p.logoSub} />
              <input type="file" name="logo" accept="image/png,image/jpeg" className="mt-2 block w-full text-sm" />
              {config.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={config.logoUrl} alt="" className="mt-2 size-14 rounded object-cover" />
              )}
            </div>

            <div className="border-b border-black/[0.06] pb-6">
              <TituloSecao icone="description" titulo={p.anexoTitulo} sub={p.anexoSub} />
              <input type="file" name="anexo" accept="application/pdf" className="mt-2 block w-full text-sm" />
              {config.anexoPdfUrl && (
                <a href={config.anexoPdfUrl} className="mt-1 inline-block text-sm text-carmesim hover:underline">
                  {config.anexoPdfUrl.split("/").pop()}
                </a>
              )}
            </div>

            <label className="block border-b border-black/[0.06] pb-6 text-sm">
              <TituloSecao icone="reply" titulo={p.emailRespostaTitulo} sub={p.emailRespostaSub} />
              <input className={input} name="emailResposta" type="email" defaultValue={config.emailResposta ?? ""} />
            </label>

            <div className="space-y-3 border-b border-black/[0.06] pb-6">
              <TituloSecao icone="title" titulo={p.mensagemPadraoTitulo} sub={p.mensagemPadraoSub} />
              <textarea
                className={input}
                name="mensagemPadrao"
                rows={2}
                placeholder={p.mensagemPlaceholder}
                defaultValue={config.mensagemPadrao ?? ""}
              />
              <textarea
                className={input}
                name="mensagemOrcamento"
                rows={2}
                placeholder={p.mensagemOrcamentoPlaceholder}
                defaultValue={config.mensagemOrcamento ?? ""}
              />
            </div>

            <label className="flex items-center justify-between gap-3 border-b border-black/[0.06] pb-6 text-sm">
              <TituloSecao icone="draw" titulo={p.assinaturaTitulo} sub={p.assinaturaSub} />
              <input type="checkbox" name="exibirAssinatura" defaultChecked={config.exibirAssinatura} className="size-5 shrink-0 rounded accent-carmesim" />
            </label>

            <label className="block border-b border-black/[0.06] pb-6 text-sm">
              <TituloSecao icone="badge" titulo={p.nomeContaQrTitulo} sub={p.nomeContaQrSub} />
              <input className={input} name="nomeContaQR" defaultValue={config.nomeContaQR ?? ""} />
            </label>

            <label className="block border-b border-black/[0.06] pb-6 text-sm">
              <TituloSecao icone="credit_card" titulo={p.referenciaTitulo} sub={p.referenciaSub} />
              <input className={input} name="referenciaPagamento" defaultValue={config.referenciaPagamento ?? ""} />
            </label>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <TituloSecao icone="schedule" titulo={p.prazoTitulo} sub={p.prazoSub} />
                <input
                  type="checkbox"
                  name="usarPrazoPersonalizado"
                  defaultChecked={config.usarPrazoPersonalizado}
                  className="size-5 shrink-0 rounded accent-carmesim"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="text-grafite/70">{p.prazoFatura}</span>
                  <input className={input} name="prazoFaturaDias" type="number" min={0} defaultValue={config.prazoFaturaDias} />
                </label>
                <label className="block text-sm">
                  <span className="text-grafite/70">{p.prazoOrcamento}</span>
                  <input className={input} name="prazoOrcamentoDias" type="number" min={0} defaultValue={config.prazoOrcamentoDias} />
                </label>
              </div>
            </div>

            <button className={botao}>
              <MaterialIcon name="check_circle" className="text-[16px]" /> {p.botaoSalvar}
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
