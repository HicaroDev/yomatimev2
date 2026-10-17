import type { Locale } from "@/content/yoma";
import { getPainelDicionario } from "@/dictionaries/painel";

export default function BancoNaoConfigurado({
  tabelasFaltando = false,
  locale = "it",
}: {
  tabelasFaltando?: boolean;
  locale?: Locale;
}) {
  const { banco } = getPainelDicionario(locale).yomadesk;
  return (
    <div className="rounded-xl border border-black/[0.08] bg-white/65 p-6 text-sm backdrop-blur-[16px]">
      <h2 className="text-lg font-semibold text-grafite">
        {tabelasFaltando ? banco.tabelasFaltandoTitulo : banco.naoConfiguradoTitulo}
      </h2>
      <p className="mt-2 text-grafite/70">{tabelasFaltando ? banco.tabelasFaltandoTexto : banco.naoConfiguradoTexto}</p>
    </div>
  );
}
