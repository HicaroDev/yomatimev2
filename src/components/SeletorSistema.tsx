import { LOCALES, type Locale } from "@/content/yoma";
import { definirIdiomaSistema } from "@/app/yomapanel/actions";

const ROTULOS: Record<Locale, string> = { it: "IT", en: "EN", pt: "PT" };

// Seletor do idioma da INTERFACE (não do conteúdo) — fica embaixo da logo na
// sidebar do /yomapanel e do /yomadesk. Troca o cookie sistema_locale e recarrega
// a página atual (server action sem redirect = Next re-renderiza no lugar).
export default function SeletorSistema({ atual, label }: { atual: Locale; label: string }) {
  return (
    <div>
      <div className="mx-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <form action={definirIdiomaSistema} className="flex items-center gap-3 px-2 pt-2">
        <span className="sr-only">{label}</span>
        {LOCALES.map((l) => (
          <button
            key={l}
            type="submit"
            name="locale"
            value={l}
            title={label}
            className={`text-[11px] font-semibold uppercase tracking-wide transition-colors ${
              l === atual ? "text-carmesim" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {ROTULOS[l]}
          </button>
        ))}
      </form>
    </div>
  );
}
