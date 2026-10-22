import Hero from "@/components/Hero";
import { getContent } from "@/lib/content-store";
import { LOCALES, type Locale } from "@/content/yoma";

// Rota de preview isolada — não linkada em nenhum lugar. Agora usa o mesmo conteúdo real
// (3 idiomas) da home — ?locale=en ou ?locale=pt pra conferir as outras línguas.
// Filler abaixo só existe aqui pra dar o que rolar e testar o parallax; não entra na home real.
export default async function PreviewHeroPage({ searchParams }: { searchParams: Promise<{ locale?: string }> }) {
  const { locale: localeParam } = await searchParams;
  const locale = (LOCALES.includes(localeParam as Locale) ? localeParam : "it") as Locale;
  const { hero } = await getContent(locale);
  return (
    <>
      <Hero linha1={hero.linha1} accento={hero.accento} lead={hero.sottotitolo} />
      <div style={{ height: "150vh", background: "#1b2b2a" }} />
    </>
  );
}
