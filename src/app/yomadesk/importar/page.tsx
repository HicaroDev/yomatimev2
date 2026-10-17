import { bancoConfigurado } from "@/lib/yomadesk/db";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { importarClientesCsv } from "../actions";
import BancoNaoConfigurado from "../BancoNaoConfigurado";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default async function ImportarPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { locale, t } = await obterDicionarioPainel();
  const i = t.yomadesk.importar;
  const MENSAGENS_ERRO: Record<string, string> = {
    vazio: i.erroVazio,
    "sem-coluna-nome": i.erroSemColuna,
  };

  if (!bancoConfigurado) {
    return (
      <>
        <PageHeader titulo={t.yomadesk.menu.importar} />
        <div className="max-w-4xl px-4 py-8 sm:px-8">
          <BancoNaoConfigurado locale={locale} />
        </div>
      </>
    );
  }

  const { erro } = await searchParams;

  return (
    <>
      <PageHeader titulo={i.titulo} />
      <div className="max-w-4xl space-y-6 px-4 py-8 sm:px-8">
        <p className="text-sm text-muted-foreground">{i.subtitulo}</p>

        {erro && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {MENSAGENS_ERRO[erro] ?? i.erroGenerico}
          </div>
        )}

        <section className="vidro-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-grafite">{i.secaoTitulo}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{i.secaoSubtitulo}</p>
          <form action={importarClientesCsv} className="mt-3 flex flex-wrap items-center gap-3">
            <input type="file" name="arquivo" accept=".csv" required className="text-sm" />
            <button className="rounded-lg bg-carmesim px-4 py-2 text-sm text-white transition-colors hover:bg-carmesim-escuro">{i.botaoImportar}</button>
          </form>
        </section>
      </div>
    </>
  );
}
