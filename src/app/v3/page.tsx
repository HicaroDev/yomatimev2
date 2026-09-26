import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  avvertenzaMassaggi,
  contatti,
  discipline,
  eventi,
  galleria,
  hero,
  kristina,
  listini,
  massaggi,
  nav,
  studio,
  whatsappMsg,
} from "@/content/yoma";
import { ArrowRight, Facebook, Instagram, Mail, Phone, Pin, WhatsApp } from "@/components/icons";
import { bodoni, jost, pinyon } from "../fonts";
import Aura from "./Aura";
import Menu from "./Menu";
import Parallax from "./Parallax";

export const metadata: Metadata = { title: "YomaTime · V3 Firma" };

const serif = "font-[family-name:var(--font-bodoni)]";
const firma = "font-[family-name:var(--font-pinyon)] font-normal";
const occhiello = "text-[0.7rem] uppercase tracking-[0.35em] text-salvia";

// Palavra manuscrita que acompanha cada prática.
const parole: Record<string, string> = {
  yoga: "respiro",
  pilates: "equilibrio",
  reformer: "forza",
  massaggi: "cura",
};

function Filetto() {
  return <span aria-hidden className="mx-auto block h-12 w-px bg-oro/60" />;
}

export default function V3() {
  return (
    <div className={`${jost.variable} ${bodoni.variable} ${pinyon.variable} relative font-[family-name:var(--font-jost)] font-light text-notte`}>
      <Aura />
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-avorio focus:p-2">
        Vai al contenuto
      </a>

      {/* Cabeçalho */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-oro/25 bg-avorio/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
          <Link href="#" aria-label="YomaTime, inizio pagina" className="flex items-center gap-3">
            <Image src="/img/logo.png" alt="" width={44} height={44} priority />
          </Link>
          <nav aria-label="Principale" className="hidden lg:block">
            <ul className="flex gap-9 text-[0.72rem] uppercase tracking-[0.28em]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-salvia">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <a
              href={whatsappMsg("Ciao Kristina, vorrei prenotare")}
              className="hidden min-h-11 items-center border border-notte/70 px-6 text-[0.72rem] uppercase tracking-[0.28em] transition-colors hover:bg-notte hover:text-avorio sm:inline-flex"
            >
              Prenota
            </a>
            <Menu />
          </div>
        </div>
      </header>

      <main id="contenuto">
        {/* Hero — o logo recriado em tipografia, com camadas em parallax */}
        <section className="relative flex min-h-dvh items-center justify-center overflow-hidden pt-16">
          <Parallax speed={-0.18} className="absolute right-[6%] top-[13%] w-[27vw] max-w-60 md:left-[4%] md:right-auto md:top-[18%] md:w-[17vw]">
            <div className="relative aspect-[3/4] overflow-hidden shadow-2xl shadow-notte/15">
              <Image src="/img/studio-sala.jpg" alt="" fill sizes="(min-width:768px) 17vw, 27vw" className="object-cover" />
            </div>
          </Parallax>
          <Parallax speed={0.22} className="absolute bottom-[8%] right-[5%] w-[34vw] max-w-72 md:w-[19vw]">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl shadow-notte/15">
              <Image src="/img/massaggio-hotstone.jpg" alt="" fill sizes="(min-width:768px) 19vw, 34vw" className="object-cover" />
            </div>
          </Parallax>
          <Parallax speed={0.4} className="absolute bottom-[12%] left-[6%] w-[26vw] max-w-44 md:bottom-[6%] md:left-[22%] md:w-[11vw]">
            <div className="relative aspect-square overflow-hidden rounded-full shadow-xl shadow-notte/15">
              <Image src="/img/pilates-mat-1.jpg" alt="" fill sizes="(min-width:768px) 11vw, 26vw" className="object-cover" />
            </div>
          </Parallax>

          <Parallax speed={0.08} className="relative z-10 px-4 text-center">
            <h1 className="sr-only">{hero.titolo}</h1>
            <div aria-hidden className="relative">
              <p className="text-[29vw] font-extralight leading-none tracking-[0.06em] text-menta [text-shadow:0_1px_0_rgb(255_255_255/0.4)] md:text-[17vw] 2xl:text-[16rem]">
                YOMA
              </p>
              <p className={`${firma} absolute inset-x-0 top-1/2 -translate-y-[42%] -rotate-3 text-[23vw] leading-none md:text-[12vw] 2xl:text-[11rem]`}>
                time
              </p>
            </div>
            <p className="mt-6 text-[0.72rem] uppercase tracking-[0.5em]">Il tempo per te</p>
            <p className="mx-auto mt-8 max-w-md text-base leading-relaxed md:text-lg">{hero.sottotitolo}</p>
            <a
              href={whatsappMsg("Ciao Kristina, vorrei prenotare una lezione di prova")}
              className="mt-10 inline-flex min-h-12 items-center gap-3 bg-notte px-8 text-[0.72rem] uppercase tracking-[0.28em] text-avorio transition-colors hover:bg-salvia"
            >
              Lezione di prova <ArrowRight className="size-4" />
            </a>
          </Parallax>
        </section>

        {/* Lo Studio — texto centrado, como uma carta de apresentação */}
        <section id="studio" className="scroll-mt-20 px-4 py-28 sm:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <p className={occhiello}>Lo Studio</p>
            <h2 className={`${serif} mt-6 text-4xl leading-tight sm:text-6xl`}>
              Uno spazio dedicato <span className={`${firma} text-salvia text-5xl sm:text-7xl`}>a te</span>
            </h2>
            <Filetto />
            <div className="mt-10 space-y-6 text-lg leading-relaxed">
              {studio.paragrafi.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className={`${firma} mt-14 text-5xl leading-tight text-salvia sm:text-6xl`}>Prenditi il tuo tempo.</p>
            <p className={`${serif} mt-3 text-xl italic`}>Respira, ascoltati, ritrova te stessa.</p>
          </div>
        </section>

        {/* Práticas — faixas com foto de fundo em parallax */}
        <div id="corsi" className="scroll-mt-16">
          {discipline.map((d, i) => (
            <section
              key={d.id}
              id={d.id === "reformer" || d.id === "massaggi" ? d.id : undefined}
              aria-labelledby={`t-${d.id}`}
              className="relative flex min-h-[92dvh] scroll-mt-16 items-center overflow-hidden px-4 py-20 sm:px-8"
            >
              <Parallax speed={0.18} className="absolute inset-x-0 -inset-y-[18%]">
                <div className="relative size-full">
                  <Image src={d.immagine} alt={d.alt} fill sizes="100vw" className="object-cover" />
                </div>
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-r from-notte/45 via-notte/10 to-transparent" />
              <div className={`relative mx-auto w-full max-w-7xl ${i % 2 ? "flex justify-end" : ""}`}>
                <article className="relative max-w-md border border-oro/50 bg-avorio/92 p-8 shadow-2xl shadow-notte/20 backdrop-blur-sm sm:p-12">
                  <p className={`${serif} text-sm italic text-salvia`}>N° {i + 1}</p>
                  <p aria-hidden className={`${firma} absolute -top-10 right-6 text-6xl text-salvia sm:-top-12 sm:text-7xl`}>
                    {parole[d.id]}
                  </p>
                  <h3 id={`t-${d.id}`} className={`${serif} mt-3 text-4xl leading-none sm:text-5xl`}>
                    {d.nome}
                  </h3>
                  <p className={`${occhiello} mt-4`}>{d.sottotitolo}</p>
                  <p className="mt-6 leading-relaxed">{d.testo}</p>
                  <a
                    href={whatsappMsg(`Ciao Kristina, vorrei informazioni su ${d.nome}`)}
                    className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-notte/60 text-[0.72rem] uppercase tracking-[0.28em]"
                  >
                    Prenota <ArrowRight className="size-4" />
                  </a>
                </article>
              </div>
            </section>
          ))}
        </div>

        {/* Carta dei massaggi — foto fixa ao lado, lista elegante */}
        <section aria-labelledby="t-carta" className="px-4 py-28 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className={occhiello}>Carta dei massaggi</p>
                <h2 id="t-carta" className={`${serif} mt-5 text-4xl leading-tight sm:text-5xl`}>
                  Il tuo momento di <em>benessere</em>
                </h2>
                <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden lg:block">
                  <Parallax speed={0.12} className="absolute inset-x-0 -inset-y-[12%]">
                    <div className="relative size-full">
                      <Image src="/img/massaggio-spalle.jpg" alt="" fill sizes="40vw" className="object-cover" />
                    </div>
                  </Parallax>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul>
                {massaggi.map((m) => (
                  <li key={m.nome} className="border-b border-oro/40 py-7 first:pt-0">
                    <div className="flex items-baseline gap-3">
                      <h3 className={`${serif} text-2xl sm:text-3xl`}>{m.nome}</h3>
                      <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-notte/30" />
                      <span className={`${serif} text-2xl tabular-nums`}>{m.prezzo ? m.prezzo : "—"}</span>
                    </div>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.3em] text-salvia">
                      {m.durata}
                      {m.preferito && <span className={`${firma} ml-3 text-2xl normal-case tracking-normal`}>il preferito</span>}
                    </p>
                    <p className="mt-3 max-w-lg leading-relaxed">{m.testo}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-notte/75">{avvertenzaMassaggi}</p>
            </div>
          </div>
        </section>

        {/* Kristina — carta assinada */}
        <section aria-labelledby="t-kristina" className="px-4 py-24 sm:px-8">
          <div className="relative mx-auto max-w-3xl">
            <Parallax speed={-0.1} className="absolute -left-2 -top-16 z-10 w-28 sm:-left-16 sm:w-40">
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-avorio shadow-xl shadow-notte/20">
                <Image src="/img/kristina.jpg" alt="Kristina Dendena" fill sizes="160px" className="object-cover" />
              </div>
            </Parallax>
            <article className="border border-oro/40 bg-avorio px-6 pb-14 pt-28 shadow-2xl shadow-notte/10 sm:px-16 sm:pt-28">
              <p className={occhiello}>{kristina.ruolo}</p>
              <h2 id="t-kristina" className={`${firma} mt-6 text-5xl sm:text-6xl`}>
                Cara amica,
              </h2>
              <div className={`${serif} mt-8 space-y-5 text-lg leading-relaxed`}>
                {kristina.bio.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <p className={`${serif} mt-8 text-lg italic`}>
                Il mio motto? <span className="not-italic">“{kristina.motto}.”</span>
              </p>
              <p className={`${firma} mt-10 text-right text-6xl leading-none text-salvia sm:text-7xl`}>Kristina Dendena</p>
            </article>
          </div>
        </section>

        {/* Eventos */}
        <section aria-labelledby="t-eventi" className="px-4 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <p className={occhiello}>Eventi e serate</p>
            <h2 id="t-eventi" className={`${serif} mx-auto mt-5 max-w-3xl text-3xl leading-snug sm:text-4xl`}>
              {studio.eventi}
            </h2>
            <ul className="mt-14 grid gap-px bg-oro/40 sm:grid-cols-2 lg:grid-cols-4">
              {eventi.map((e) => (
                <li key={e.nome} className="bg-avorio/80 px-6 py-10">
                  <h3 className={`${firma} text-4xl text-salvia`}>{e.nome}</h3>
                  <p className="mt-3 text-sm">{e.testo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Preços */}
        <section id="prezzi" aria-labelledby="t-prezzi" className="scroll-mt-16 px-4 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className={occhiello}>Prezzi · CHF</p>
              <h2 id="t-prezzi" className={`${serif} mt-5 text-4xl sm:text-5xl`}>
                La prima lezione di gruppo <em>è un regalo</em>
              </h2>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {listini.map((l) => (
                <div key={l.id} className="border border-oro/50 bg-avorio/85 p-7 sm:p-9">
                  <h3 className={`${serif} text-center text-2xl italic`}>{l.titolo}</h3>
                  <Filetto />
                  <ul className="mt-4">
                    {l.voci.map((v) => (
                      <li key={v.nome} className="flex items-baseline gap-3 py-3">
                        <span className="text-[0.95rem]">
                          {v.nome}
                          <span className="block text-xs text-notte/65">{v.nota}</span>
                        </span>
                        <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-notte/25" />
                        <span className={`${serif} text-xl tabular-nums`}>{v.prezzo}</span>
                      </li>
                    ))}
                  </ul>
                  {l.note && <p className="mt-5 border-t border-oro/40 pt-4 text-center text-sm italic">{l.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Galeria — colunas que andam em velocidades diferentes */}
        <section aria-label="Galleria" className="overflow-hidden px-4 py-24 sm:px-8">
          {[
            { n: 2, classe: "grid grid-cols-2 md:hidden", speeds: [0.06, -0.08] },
            { n: 3, classe: "hidden md:grid md:grid-cols-3", speeds: [0.05, -0.12, 0.1] },
          ].map((g) => (
            <div key={g.n} className={`mx-auto max-w-7xl gap-4 md:gap-6 ${g.classe}`}>
              {g.speeds.map((speed, col) => (
                <Parallax key={col} speed={speed} className="space-y-4 md:space-y-6">
                  {galleria
                    .filter((_, k) => k % g.n === col)
                    .map((f) => (
                      <Image key={f.src} src={f.src} alt={f.alt} width={f.w} height={f.h} sizes="(min-width:768px) 33vw, 50vw" className="w-full" />
                    ))}
                </Parallax>
              ))}
            </div>
          ))}
        </section>
      </main>

      {/* Contatos */}
      <footer id="contatti" className="scroll-mt-16 px-4 pb-10 pt-24 sm:px-8">
        <div className="mx-auto max-w-7xl border-t border-oro/50 pt-16 text-center">
          <p className={`${firma} text-7xl text-salvia sm:text-8xl`}>A presto</p>
          <p className={`${serif} mt-4 text-xl italic`}>Uno spazio in cui ti dedichi del tempo.</p>
          <ul className="mx-auto mt-14 grid max-w-4xl gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <a href={contatti.mappa} className="flex gap-3">
                <Pin className="size-5 shrink-0 text-salvia" />
                <span>
                  {contatti.indirizzo}
                  <br />
                  {contatti.cap}
                </span>
              </a>
            </li>
            <li>
              <a href={contatti.whatsapp} className="flex min-h-11 items-center gap-3">
                <WhatsApp className="size-5 text-salvia" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={contatti.telefonoHref} className="flex min-h-11 items-center gap-3">
                <Phone className="size-5 text-salvia" /> {contatti.telefono}
              </a>
            </li>
            <li>
              <a href={`mailto:${contatti.email}`} className="flex min-h-11 items-center gap-3">
                <Mail className="size-5 text-salvia" /> {contatti.email}
              </a>
            </li>
          </ul>
          <div className="mt-10 flex justify-center gap-3">
            <a href={contatti.instagram} aria-label="Instagram" className="flex size-11 items-center justify-center rounded-full border border-notte/40">
              <Instagram />
            </a>
            <a href={contatti.facebook} aria-label="Facebook" className="flex size-11 items-center justify-center rounded-full border border-notte/40">
              <Facebook />
            </a>
          </div>
          <p className="mt-14 text-xs text-notte/70">
            © 2026 YomaTime · {contatti.titolare} ·{" "}
            <Link href="/" className="underline">
              tutte le proposte
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
