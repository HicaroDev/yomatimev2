import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { bodoni, cormorant, dmSans, instrument, jost, manrope, pinyon } from "./fonts";

const versioni = [
  {
    href: "/v1",
    n: "V1",
    nome: "Luce",
    idea: "Editoriale e luminosa. Serif elegante, molte pause bianche, foto incorniciate negli archi delle finestre dello studio.",
    img: "/img/studio-sala.jpg",
    card: "bg-lino text-inchiostro",
    titolo: "font-[family-name:var(--font-cormorant)] italic",
    colori: ["#f6f2eb", "#b8d4c6", "#c49a6c", "#25302b"],
  },
  {
    href: "/v2",
    n: "V2",
    nome: "Respiro",
    idea: "Immersiva e serale. Verde eucalipto profondo con la menta del logo, fotografie a tutto schermo, ritmo lento.",
    img: "/img/massaggio-hotstone.jpg",
    card: "bg-eucalipto text-crema",
    titolo: "font-[family-name:var(--font-instrument)]",
    colori: ["#15302a", "#1e3d35", "#b8d4c6", "#efe9df"],
  },
  {
    href: "/v3",
    n: "V3",
    nome: "Firma",
    idea: "Raffinata e firmata. Il logo ricreato in grande con la scritta a mano, sfondi che sfumano menta, salvia e champagne, immagini in parallasse.",
    img: "/img/massaggio-viso.jpg",
    card: "bg-avorio text-notte",
    titolo: "font-[family-name:var(--font-pinyon)] text-5xl",
    colori: ["#faf7f2", "#b8d4c6", "#ecdfca", "#dcbcb1"],
  },
];

export default function Scelta() {
  const fonts = [cormorant, manrope, instrument, dmSans, jost, bodoni, pinyon].map((f) => f.variable).join(" ");
  return (
    <main className={`${fonts} min-h-dvh bg-sabbia px-4 py-8 text-inchiostro sm:px-8 sm:py-12 font-[family-name:var(--font-manrope)]`}>
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <Image src="/img/logo.png" alt="YomaTime — il tempo per te" width={88} height={88} priority />
        <p className="text-right text-xs uppercase tracking-[0.2em] text-menta-scura">
          Proposte per il nuovo sito
          <br />
          settembre 2026
        </p>
      </header>

      <section className="mx-auto mt-10 max-w-6xl sm:mt-16">
        <h1 className="max-w-3xl font-[family-name:var(--font-cormorant)] text-5xl leading-[1.02] sm:text-7xl">
          Tre strade per <em>raccontare</em> YomaTime.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed">
          Stessi contenuti, stesse foto, stesso logo. Cambia il carattere. Apri ogni proposta, guardala anche dal
          telefono, e scegli quella che ti somiglia di più.
        </p>
      </section>

      <ol className="mx-auto mt-10 grid max-w-6xl gap-4 sm:mt-14 lg:grid-cols-3">
        {versioni.map((v) => (
          <li key={v.n}>
            <Link
              href={v.href}
              className={`group flex h-full flex-col overflow-hidden rounded-sm ${v.card} ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={v.img}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 bg-white/90 px-2 py-1 text-xs tracking-widest text-inchiostro">
                  {v.n}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h2 className={`text-4xl ${v.titolo}`}>{v.nome}</h2>
                <p className="text-sm leading-relaxed opacity-85">{v.idea}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="flex gap-1.5" aria-label="Palette">
                    {v.colori.map((c) => (
                      <span key={c} className="size-5 rounded-full ring-1 ring-black/10" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium">
                    Apri <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <footer className="mx-auto mt-14 max-w-6xl border-t border-inchiostro/15 pt-6 text-xs text-inchiostro/70">
        Anteprima di lavoro · testi e prezzi presi da yomatime.ch · foto provvisorie dal sito attuale
      </footer>
    </main>
  );
}
