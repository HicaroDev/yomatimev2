import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  avvertenzaMassaggi,
  contatti,
  discipline,
  eventi,
  kristina,
  listini,
  massaggi,
  studio,
  whatsappMsg,
} from "@/content/yoma";
import { ArrowRight, Facebook, Instagram, Mail, Phone, Pin, WhatsApp } from "@/components/icons";
import { dmSans, instrument } from "../fonts";
import Menu from "./Menu";

export const metadata: Metadata = { title: "YomaTime · V2 Respiro" };

const serif = "font-[family-name:var(--font-instrument)]";

export default function V2() {
  return (
    <div className={`${instrument.variable} ${dmSans.variable} bg-eucalipto font-[family-name:var(--font-dmsans)] text-crema`}>
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-crema focus:p-2 focus:text-eucalipto">
        Vai al contenuto
      </a>

      {/* Barra superior + menu em tela cheia */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-10">
          <Link href="#" aria-label="YomaTime, inizio pagina" className="flex items-center gap-3">
            <Image src="/img/logo-chiaro.png" alt="" width={48} height={48} priority />
          </Link>
          <Menu />
        </div>
      </header>

      {/* Botão flutuante de reserva */}
      <a
        href={whatsappMsg("Ciao Kristina, vorrei prenotare")}
        className="fixed bottom-5 right-4 z-30 flex min-h-12 items-center gap-2 rounded-full bg-menta px-5 text-sm font-medium text-eucalipto shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] sm:right-8"
      >
        <WhatsApp className="size-5" /> Prenota
      </a>

      <main id="contenuto">
        {/* Hero em tela cheia */}
        <section className="relative flex min-h-dvh items-end overflow-hidden">
          <Image
            src="/img/studio-reformer.jpg"
            alt="I Reformer dello studio YomaTime"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-eucalipto via-eucalipto/55 to-eucalipto/20" />
          <div className="relative w-full px-4 pb-24 sm:px-10 sm:pb-20">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-menta">Yoga · Pilates Reformer · Massaggi — Lumino</p>
            <h1 className={`${serif} text-[3.4rem] leading-[0.95] sm:text-8xl lg:text-[9rem]`}>
              Respira.
              <br />
              <em className="text-menta">Ascoltati.</em>
              <br />
              Ritrova te stessa.
            </h1>
          </div>
        </section>

        {/* Manifesto */}
        <section id="studio" className="scroll-mt-20 px-4 py-28 sm:px-10 sm:py-40">
          <div className="mx-auto max-w-5xl">
            <p className="mb-8 text-xs uppercase tracking-[0.3em] text-menta">Lo studio</p>
            <p className={`${serif} text-3xl leading-[1.25] sm:text-5xl`}>
              YomaTime è uno studio in continua evoluzione, dove il <em className="text-menta">benessere</em> e l’
              <em className="text-menta">armonia</em> diventano esperienza quotidiana per chi lo frequenta.
            </p>
            <div className="mt-14 grid gap-8 text-base leading-relaxed text-crema/80 sm:grid-cols-2">
              <p>{studio.paragrafi[1]}</p>
              <p>{studio.paragrafi[2]}</p>
            </div>
          </div>
        </section>

        {/* Disciplinas — cards empilhados no scroll */}
        <section id="corsi" aria-label="Le pratiche" className="scroll-mt-20 px-3 pb-24 sm:px-6">
          {discipline.map((d, i) => (
            <article
              key={d.id}
              id={d.id === "reformer" || d.id === "massaggi" ? d.id : undefined}
              className="sticky mb-6 grid min-h-[80dvh] scroll-mt-20 overflow-hidden rounded-3xl bg-eucalipto-2 shadow-2xl shadow-black/30 md:grid-cols-2"
              style={{ top: `${5 + i * 1.5}rem` }}
            >
              <div className="relative min-h-72 md:min-h-full">
                <Image src={d.immagine} alt={d.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
                <p className="text-sm text-menta">
                  0{i + 1} / 0{discipline.length}
                </p>
                <div>
                  <h2 className={`${serif} text-5xl sm:text-7xl`}>{d.nome}</h2>
                  <p className={`${serif} mt-2 text-2xl italic text-menta`}>{d.sottotitolo}</p>
                  <p className="mt-6 max-w-md leading-relaxed text-crema/80">{d.testo}</p>
                </div>
                <a
                  href={whatsappMsg(`Ciao Kristina, vorrei informazioni su ${d.nome}`)}
                  className="inline-flex min-h-11 w-fit items-center gap-3 rounded-full border border-crema/40 px-6 text-sm transition-colors hover:bg-crema hover:text-eucalipto"
                >
                  Prenota <ArrowRight className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* Massaggi — carrossel horizontal */}
        <section aria-labelledby="titolo-massaggi" className="py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 px-4 sm:px-10">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-menta">Carta dei massaggi</p>
              <h2 id="titolo-massaggi" className={`${serif} text-5xl sm:text-6xl`}>
                Il tuo momento
                <br />
                <em className="text-menta">di benessere.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-crema/70">Scorri per vedere tutti i trattamenti →</p>
          </div>
          <ul className="mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 sm:scroll-px-10 pb-6 sm:px-10 [scrollbar-width:thin]">
            {massaggi.map((m) => (
              <li key={m.nome} className="relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-80">
                <Image src={m.immagine} alt="" fill sizes="(min-width:640px) 320px, 78vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-menta">
                    {m.durata}
                    {m.prezzo ? ` · CHF ${m.prezzo}` : ""}
                  </p>
                  <h3 className={`${serif} mt-2 text-3xl leading-tight`}>{m.nome}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-crema/80">{m.testo}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mx-4 mt-6 max-w-2xl text-xs leading-relaxed text-crema/60 sm:mx-10">{avvertenzaMassaggi}</p>
        </section>

        {/* Kristina */}
        <section className="grid md:grid-cols-2">
          <div className="relative min-h-[70dvh]">
            <Image src="/img/kristina.jpg" alt="Kristina Dendena" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center bg-menta px-6 py-20 text-eucalipto sm:px-14">
            <p className="text-xs uppercase tracking-[0.3em]">{kristina.ruolo}</p>
            <h2 className={`${serif} mt-4 text-6xl sm:text-7xl`}>
              <em>{kristina.motto}.</em>
            </h2>
            <div className="mt-8 space-y-4 leading-relaxed">
              {kristina.bio.slice(0, 2).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-8 font-medium">— {kristina.nome}</p>
          </div>
        </section>

        {/* Eventos */}
        <section className="px-4 py-28 sm:px-10">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-menta">Eventi e serate</p>
          <ul className="divide-y divide-crema/15 border-y border-crema/15">
            {eventi.map((e) => (
              <li key={e.nome} className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className={`${serif} text-4xl sm:text-6xl`}>{e.nome}</h3>
                <p className="text-crema/70 sm:max-w-xs sm:text-right">{e.testo}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Preços — acordeão em fundo claro */}
        <section id="prezzi" className="scroll-mt-20 bg-crema px-4 py-24 text-eucalipto sm:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-menta-scura">Prezzi · CHF</p>
            <h2 className={`${serif} text-5xl sm:text-6xl`}>
              La prima lezione di gruppo
              <br />
              <em className="text-menta-scura">te la regaliamo.</em>
            </h2>
            <div className="mt-12 divide-y divide-eucalipto/15 border-y border-eucalipto/15">
              {listini.map((l, i) => (
                <details key={l.id} open={i === 0} className="group py-2">
                  <summary className={`${serif} flex min-h-16 cursor-pointer list-none items-center justify-between text-3xl sm:text-4xl`}>
                    {l.titolo}
                    <span aria-hidden className="text-2xl transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <table className="mb-6 w-full text-left">
                    <tbody>
                      {l.voci.map((v) => (
                        <tr key={v.nome} className="border-t border-eucalipto/10">
                          <th scope="row" className="py-3 pr-4 font-normal">
                            {v.nome}
                            <span className="block text-sm text-eucalipto/60">{v.nota}</span>
                          </th>
                          <td className="py-3 text-right text-xl tabular-nums">{v.prezzo === "gratis" ? "gratis" : v.prezzo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {l.note && <p className="mb-4 text-sm text-menta-scura">{l.note}</p>}
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Contatos */}
      <footer id="contatti" className="scroll-mt-20 px-4 pb-28 pt-28 sm:px-10">
        <h2 className={`${serif} text-6xl leading-none sm:text-[8rem]`}>
          Prenditi
          <br />
          <em className="text-menta">il tuo tempo.</em>
        </h2>
        <div className="mt-16 grid gap-10 border-t border-crema/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <a href={contatti.mappa} className="flex gap-3">
            <Pin className="size-5 shrink-0 text-menta" />
            <span>
              {contatti.indirizzo}
              <br />
              {contatti.cap}
            </span>
          </a>
          <a href={contatti.whatsapp} className="flex min-h-11 gap-3">
            <WhatsApp className="size-5 shrink-0 text-menta" /> WhatsApp
            <br />
            {contatti.telefono}
          </a>
          <div className="space-y-2">
            <a href={contatti.telefonoHref} className="flex min-h-11 items-center gap-3">
              <Phone className="size-5 text-menta" /> {contatti.telefono}
            </a>
            <a href={`mailto:${contatti.email}`} className="flex min-h-11 items-center gap-3">
              <Mail className="size-5 text-menta" /> {contatti.email}
            </a>
          </div>
          <div className="flex gap-2">
            <a href={contatti.instagram} aria-label="Instagram" className="flex size-12 items-center justify-center rounded-full border border-crema/30">
              <Instagram />
            </a>
            <a href={contatti.facebook} aria-label="Facebook" className="flex size-12 items-center justify-center rounded-full border border-crema/30">
              <Facebook />
            </a>
          </div>
        </div>
        <p className="mt-16 text-xs text-crema/60">
          © 2026 YomaTime · {contatti.titolare} ·{" "}
          <Link href="/" className="underline">
            tutte le proposte
          </Link>
        </p>
      </footer>
    </div>
  );
}
