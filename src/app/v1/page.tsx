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
  massaggi,
  nav,
  studio,
  whatsappMsg,
} from "@/content/yoma";
import { ArrowRight, Facebook, Instagram, Mail, Menu, Phone, Pin, WhatsApp } from "@/components/icons";
import { cormorant, manrope } from "../fonts";
import PrezziTabs from "./PrezziTabs";

export const metadata: Metadata = { title: "YomaTime · V1 Luce" };

const serif = "font-[family-name:var(--font-cormorant)]";
const romani = ["I", "II", "III", "IV"];

function Etichetta({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-menta-scura">{children}</p>;
}

export default function V1() {
  return (
    <div className={`${cormorant.variable} ${manrope.variable} bg-lino font-[family-name:var(--font-manrope)] text-inchiostro`}>
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-2">
        Vai al contenuto
      </a>

      {/* Cabeçalho */}
      <header className="sticky top-0 z-40 border-b border-inchiostro/10 bg-lino/95 backdrop-blur-sm">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
          <Link href="#" className="flex items-center gap-3" aria-label="YomaTime, inizio pagina">
            <Image src="/img/logo.png" alt="" width={52} height={52} priority />
            <span className={`${serif} hidden text-xl tracking-[0.18em] sm:inline`}>YOMATIME</span>
          </Link>
          <nav aria-label="Principale" className="hidden lg:block">
            <ul className="flex gap-8 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-menta-scura">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={whatsappMsg("Ciao Kristina, vorrei prenotare")}
              className="hidden min-h-11 items-center gap-2 rounded-full bg-inchiostro px-5 text-sm text-lino transition-colors hover:bg-menta-scura sm:inline-flex"
            >
              Prenota
            </a>
            <details className="relative lg:hidden">
              <summary className="flex size-11 cursor-pointer list-none items-center justify-center" aria-label="Menu">
                <Menu />
              </summary>
              <nav aria-label="Menu mobile" className="absolute right-0 top-12 w-60 border border-inchiostro/10 bg-lino p-4 shadow-sm">
                <ul className="flex flex-col">
                  {nav.map((n) => (
                    <li key={n.href}>
                      <a href={n.href} className="block py-3 text-base">
                        {n.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={whatsappMsg("Ciao Kristina, vorrei prenotare")} className="mt-2 block py-3 font-semibold text-menta-scura">
                      Prenota su WhatsApp
                    </a>
                  </li>
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="contenuto">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-10 sm:px-8 lg:grid-cols-12 lg:pt-16">
          <div className="flex flex-col justify-center lg:col-span-6">
            <Etichetta>Yoga · Pilates · Massaggi — Lumino</Etichetta>
            <h1 className={`${serif} text-[3.6rem] leading-[0.95] sm:text-7xl xl:text-[6.5rem]`}>
              Il tempo
              <br />
              <em className="text-menta-scura">per te.</em>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed">{hero.sottotitolo}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={whatsappMsg("Ciao Kristina, vorrei prenotare una lezione di prova")}
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-inchiostro px-7 text-lino transition-colors hover:bg-menta-scura"
              >
                Prenota una lezione di prova <ArrowRight className="size-4" />
              </a>
              <a href="#studio" className="inline-flex min-h-11 items-center border-b border-inchiostro/40 text-sm">
                Scopri lo studio
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <div className="relative ml-auto aspect-[3/4] w-[82%] overflow-hidden rounded-t-full">
              <Image
                src="/img/studio-sala.jpg"
                alt="La sala di YomaTime con i Reformer e le finestre ad arco"
                fill
                priority
                sizes="(min-width:1024px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-0 aspect-square w-[42%] overflow-hidden rounded-full border-[6px] border-lino">
              <Image src="/img/massaggio-hotstone.jpg" alt="Massaggio con pietre calde" fill sizes="20vw" className="object-cover" />
            </div>
          </div>
        </section>

        {/* Lo Studio */}
        <section id="studio" className="scroll-mt-20 bg-sabbia">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Etichetta>Lo Studio</Etichetta>
              <h2 className={`${serif} text-4xl leading-tight sm:text-5xl`}>{studio.titolo}</h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed lg:col-span-6 lg:col-start-7">
              {studio.paragrafi.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <blockquote className={`${serif} border-l-2 border-menta pl-6 pt-4 text-3xl italic leading-snug text-menta-scura`}>
                “{studio.citazione}”
              </blockquote>
            </div>
          </div>
        </section>

        {/* Discipline */}
        <section id="corsi" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
            <Etichetta>Le pratiche</Etichetta>
            <h2 className={`${serif} max-w-2xl text-4xl leading-tight sm:text-5xl`}>Quattro modi per dedicarti del tempo.</h2>
            <div className="mt-16 space-y-24">
              {discipline.map((d, i) => (
                <article
                  key={d.id}
                  id={d.id === "reformer" || d.id === "massaggi" ? d.id : undefined}
                  className="grid scroll-mt-24 items-center gap-8 md:grid-cols-12"
                >
                  <div
                    className={`relative aspect-[4/5] overflow-hidden md:col-span-5 ${
                      i % 2 ? "rounded-t-full md:order-2 md:col-start-8" : "rounded-b-full"
                    }`}
                  >
                    <Image src={d.immagine} alt={d.alt} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
                  </div>
                  <div className={`md:col-span-6 ${i % 2 ? "md:order-1" : "md:col-start-7"}`}>
                    <p className={`${serif} text-6xl text-menta`}>{romani[i]}</p>
                    <h3 className={`${serif} mt-2 text-4xl sm:text-5xl`}>{d.nome}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-menta-scura">{d.sottotitolo}</p>
                    <p className="mt-6 max-w-lg text-lg leading-relaxed">{d.testo}</p>
                    <a
                      href={whatsappMsg(`Ciao Kristina, vorrei informazioni su ${d.nome}`)}
                      className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-inchiostro/40 text-sm"
                    >
                      Prenota · {d.nome} <ArrowRight className="size-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Massaggi — carta */}
        <section className="bg-inchiostro text-lino">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-menta">Carta dei massaggi</p>
              <h2 className={`${serif} text-4xl leading-tight sm:text-5xl`}>Scegli il massaggio più adatto a te.</h2>
              <p className="mt-6 text-sm leading-relaxed text-lino/70">{avvertenzaMassaggi}</p>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {massaggi.map((m) => (
                <li key={m.nome} className="border-b border-lino/15 py-6">
                  <div className="flex items-baseline gap-4">
                    <h3 className={`${serif} flex-1 text-2xl sm:text-3xl`}>
                      {m.nome}
                      {m.preferito && <span className="ml-3 align-middle font-[family-name:var(--font-manrope)] text-[0.65rem] uppercase tracking-widest text-menta">preferito</span>}
                    </h3>
                    <span className="text-sm text-lino/60">{m.durata}</span>
                    <span className={`${serif} w-16 text-right text-2xl lining-nums tabular-nums`}>{m.prezzo ? `${m.prezzo}.–` : "—"}</span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-lino/70">{m.testo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kristina */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-8 md:grid-cols-12">
          <div className="relative mx-auto aspect-square w-full max-w-sm md:col-span-5">
            <div className="absolute inset-0 rounded-full border border-menta" />
            <div className="absolute inset-4 overflow-hidden rounded-full">
              <Image src="/img/kristina.jpg" alt="Kristina Dendena" fill sizes="(min-width:768px) 35vw, 80vw" className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Etichetta>{kristina.ruolo}</Etichetta>
            <h2 className={`${serif} text-5xl`}>{kristina.nome}</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed">
              {kristina.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className={`${serif} mt-8 text-4xl italic text-menta-scura`}>“{kristina.motto}”</p>
          </div>
        </section>

        {/* Eventi */}
        <section className="border-y border-inchiostro/10 bg-sabbia">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
            <Etichetta>Eventi e serate</Etichetta>
            <p className={`${serif} max-w-3xl text-3xl leading-snug`}>{studio.eventi}</p>
            <ul className="mt-12 grid gap-px bg-inchiostro/10 sm:grid-cols-2 lg:grid-cols-4">
              {eventi.map((e) => (
                <li key={e.nome} className="bg-sabbia p-6">
                  <h3 className={`${serif} text-2xl`}>{e.nome}</h3>
                  <p className="mt-2 text-sm text-inchiostro/70">{e.testo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prezzi */}
        <section id="prezzi" className="scroll-mt-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Etichetta>Prezzi</Etichetta>
              <h2 className={`${serif} text-4xl leading-tight sm:text-5xl`}>La prima lezione di gruppo è un regalo.</h2>
              <p className="mt-6 leading-relaxed text-inchiostro/80">
                Prezzi in franchi svizzeri. Pacchetti e buoni regalo disponibili su richiesta.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <PrezziTabs />
            </div>
          </div>
        </section>

        {/* Galleria */}
        <section aria-label="Galleria" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
          <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {galleria.map((g) => (
              <Image key={g.src} src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width:768px) 33vw, 50vw" className="w-full" />
            ))}
          </div>
        </section>
      </main>

      {/* Contatti */}
      <footer id="contatti" className="scroll-mt-20 bg-menta/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/img/logo.png" alt="YomaTime — il tempo per te" width={140} height={140} />
            <p className={`${serif} mt-6 text-3xl italic`}>Uno spazio in cui ti dedichi del tempo.</p>
          </div>
          <ul className="space-y-2 text-base md:col-span-6 md:col-start-7">
            <li>
              <a href={contatti.mappa} className="flex min-h-11 items-center gap-3">
                <Pin /> {contatti.indirizzo}, {contatti.cap}
              </a>
            </li>
            <li>
              <a href={contatti.whatsapp} className="flex min-h-11 items-center gap-3">
                <WhatsApp /> WhatsApp {contatti.telefono}
              </a>
            </li>
            <li>
              <a href={contatti.telefonoHref} className="flex min-h-11 items-center gap-3">
                <Phone /> {contatti.telefono}
              </a>
            </li>
            <li>
              <a href={`mailto:${contatti.email}`} className="flex min-h-11 items-center gap-3">
                <Mail /> {contatti.email}
              </a>
            </li>
            <li className="flex gap-2 pt-4">
              <a href={contatti.instagram} aria-label="Instagram" className="flex size-11 items-center justify-center rounded-full border border-inchiostro/30">
                <Instagram />
              </a>
              <a href={contatti.facebook} aria-label="Facebook" className="flex size-11 items-center justify-center rounded-full border border-inchiostro/30">
                <Facebook />
              </a>
            </li>
          </ul>
        </div>
        <p className="border-t border-inchiostro/10 px-4 py-6 text-center text-xs text-inchiostro/70">
          © 2026 YomaTime · {contatti.titolare} ·{" "}
          <Link href="/" className="underline">
            tutte le proposte
          </Link>
        </p>
      </footer>
    </div>
  );
}
