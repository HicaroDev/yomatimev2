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
import { ArrowUpRight, Facebook, Instagram, WhatsApp } from "@/components/icons";
import { bricolage, dmMono } from "../fonts";

export const metadata: Metadata = { title: "YomaTime · V3 Radiate" };

const mono = "font-[family-name:var(--font-dmmono)]";
// Cores do quadro "Radiate Positivity" do estúdio, uma por disciplina.
const accenti = ["bg-menta", "bg-sole", "bg-cielo", "bg-rosa"];

function Titolo({ n, children, id }: { n: string; children: React.ReactNode; id?: string }) {
  return (
    <div className="grid grid-cols-4 gap-4 border-t-2 border-nero pt-4 md:grid-cols-12">
      <p className={`${mono} col-span-1 text-sm md:col-span-2`}>{n}</p>
      <h2 id={id} className="col-span-3 text-4xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-6xl md:col-span-10">
        {children}
      </h2>
    </div>
  );
}

function Arcobaleno({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} aria-hidden fill="none" strokeWidth="7" strokeLinecap="round">
      <path d="M8 60a52 52 0 0 1 104 0" className="stroke-terra" />
      <path d="M20 60a40 40 0 0 1 80 0" className="stroke-sole" />
      <path d="M32 60a28 28 0 0 1 56 0" className="stroke-menta" />
      <path d="M44 60a16 16 0 0 1 32 0" className="stroke-cielo" />
    </svg>
  );
}

export default function V3() {
  return (
    <div className={`${bricolage.variable} ${dmMono.variable} bg-carta font-[family-name:var(--font-bricolage)] text-nero`}>
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-sole focus:p-2">
        Vai al contenuto
      </a>

      {/* Faixa de informação */}
      <div className={`${mono} bg-nero px-4 py-2 text-xs text-carta sm:px-8`}>
        <div className="mx-auto flex max-w-[90rem] flex-wrap justify-between gap-x-6 gap-y-1">
          <span>
            {contatti.indirizzo}, {contatti.cap}
          </span>
          <a href={contatti.whatsapp} className="underline-offset-2 hover:underline">
            WhatsApp {contatti.telefono}
          </a>
        </div>
      </div>

      {/* Cabeçalho */}
      <header className="sticky top-0 z-40 border-b-2 border-nero bg-carta">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <Link href="#" className="flex items-center gap-3" aria-label="YomaTime, inizio pagina">
            <Image src="/img/logo.png" alt="" width={44} height={44} priority />
            <span className="text-lg font-extrabold uppercase tracking-tight">Yomatime</span>
          </Link>
          <nav aria-label="Principale" className="hidden md:block">
            <ul className={`${mono} flex gap-1 text-sm`}>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="rounded-full px-3 py-2 transition-colors hover:bg-menta">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={whatsappMsg("Ciao Kristina, vorrei prenotare")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-nero px-5 text-sm font-semibold text-carta transition-colors hover:bg-terra"
          >
            Prenota <ArrowUpRight className="size-4" />
          </a>
        </div>
        {/* Navegação mobile rolável */}
        <nav aria-label="Sezioni" className="border-t border-nero/15 md:hidden">
          <ul className={`${mono} flex gap-1 overflow-x-auto px-3 py-2 text-sm`}>
            {nav.map((n) => (
              <li key={n.href} className="shrink-0">
                <a href={n.href} className="block rounded-full border border-nero/20 px-3 py-2">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="contenuto" className="mx-auto max-w-[90rem] px-4 sm:px-8">
        {/* Hero */}
        <section className="pb-16 pt-8 sm:pt-12">
          <h1 className="sr-only">{hero.titolo}</h1>
          <p aria-hidden className="text-[27vw] font-extrabold uppercase leading-[0.78] tracking-[-0.06em] sm:text-[24vw] xl:text-[21rem]">
            Yoma<span className="text-menta">.</span>
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-12">
            <div className="flex flex-col justify-between gap-8 md:col-span-4">
              <p className="text-2xl font-semibold leading-tight sm:text-3xl">{hero.sottotitolo}</p>
              <div className="flex items-end gap-4">
                <Arcobaleno className="w-28" />
                <p className={`${mono} text-sm`}>
                  Il tempo
                  <br />
                  per te
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] md:col-span-5">
              <Image src="/img/studio-sala-2.jpg" alt="Reformer in legno chiaro nello studio" fill priority sizes="(min-width:768px) 42vw, 100vw" className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-3 md:grid-cols-1">
              <div className="relative aspect-square overflow-hidden rounded-full">
                <Image src="/img/pilates-mat-2.jpg" alt="Pilates a corpo libero" fill sizes="25vw" className="object-cover" />
              </div>
              <a
                href={whatsappMsg("Ciao Kristina, vorrei prenotare la lezione di prova gratuita")}
                className="flex flex-col justify-between rounded-[2rem] bg-sole p-5 transition-transform hover:-rotate-1"
              >
                <span className={`${mono} text-xs uppercase`}>Corsi di gruppo</span>
                <span className="text-2xl font-extrabold leading-none">
                  Prima lezione
                  <br />
                  gratis
                </span>
                <ArrowUpRight className="size-6 self-end" />
              </a>
            </div>
          </div>
        </section>

        {/* 01 Studio */}
        <section id="studio" className="scroll-mt-32 py-16">
          <Titolo n="01">Lo studio</Titolo>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <p className="text-2xl font-semibold leading-snug sm:text-4xl md:col-span-7 md:col-start-3">{studio.paragrafi[0]}</p>
            <div className="space-y-4 text-lg leading-relaxed md:col-span-5 md:col-start-3">
              <p>{studio.paragrafi[1]}</p>
              <p>{studio.paragrafi[2]}</p>
            </div>
            <blockquote className="rounded-[2rem] bg-menta p-8 text-2xl font-bold leading-tight md:col-span-4 md:col-start-9">
              “{studio.citazione}”
            </blockquote>
          </div>
        </section>

        {/* 02 Discipline */}
        <section id="corsi" className="scroll-mt-32 py-16">
          <Titolo n="02">Corsi & pratiche</Titolo>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {discipline.map((d, i) => (
              <li
                key={d.id}
                id={d.id === "reformer" || d.id === "massaggi" ? d.id : undefined}
                className="flex scroll-mt-32 flex-col overflow-hidden rounded-[2rem] border-2 border-nero"
              >
                <div className="relative aspect-[4/5]">
                  <Image src={d.immagine} alt={d.alt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                  <span className={`${mono} absolute left-3 top-3 rounded-full ${accenti[i]} px-3 py-1 text-xs`}>0{i + 1}</span>
                </div>
                <div className="flex flex-1 flex-col gap-3 border-t-2 border-nero p-5">
                  <h3 className="text-2xl font-extrabold uppercase leading-none">{d.nome}</h3>
                  <p className={`${mono} text-xs uppercase`}>{d.sottotitolo}</p>
                  <p className="text-sm leading-relaxed">{d.testo}</p>
                  <a
                    href={whatsappMsg(`Ciao Kristina, vorrei informazioni su ${d.nome}`)}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-2 underline-offset-4"
                  >
                    Prenota <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Faixa "Radiate Positivity" */}
      <div aria-hidden className="overflow-hidden border-y-2 border-nero bg-terra py-4 text-carta">
        <div className="flex w-max animate-[scorri_30s_linear_infinite] gap-10 whitespace-nowrap text-4xl font-extrabold uppercase">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Radiate Positivity ✦ Il tempo per te ✦</span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
        {/* 03 Massaggi */}
        <section id="massaggi-carta" aria-labelledby="t-massaggi" className="py-16">
          <Titolo n="03" id="t-massaggi">
            Massaggi
          </Titolo>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <ul className="md:col-span-8 md:col-start-3">
              {massaggi.map((m) => (
                <li key={m.nome} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b-2 border-nero/10 py-5">
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {m.nome}
                    {m.preferito && <span className={`${mono} ml-2 rounded-full bg-rosa px-2 py-0.5 align-middle text-[0.7rem] font-normal`}>preferito</span>}
                  </h3>
                  <p className={`${mono} text-right text-lg`}>
                    {m.durata} · {m.prezzo ? `CHF ${m.prezzo}` : "su richiesta"}
                  </p>
                  <p className="col-span-2 max-w-xl text-sm leading-relaxed text-nero/75">{m.testo}</p>
                </li>
              ))}
            </ul>
            <p className={`${mono} text-xs leading-relaxed text-nero/70 md:col-span-2 md:col-start-1 md:row-start-1`}>{avvertenzaMassaggi}</p>
          </div>
        </section>

        {/* 04 Prezzi — tabela em 3 colunas */}
        <section id="prezzi" className="scroll-mt-32 py-16">
          <Titolo n="04">Prezzi</Titolo>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {listini.map((l, i) => (
              <div key={l.id} className="rounded-[2rem] border-2 border-nero p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-extrabold uppercase">{l.titolo}</h3>
                  <span className={`size-6 rounded-full ${["bg-menta", "bg-cielo", "bg-rosa"][i]}`} />
                </div>
                <p className={`${mono} mt-1 text-xs`}>CHF</p>
                <table className="mt-4 w-full text-left text-sm">
                  <tbody>
                    {l.voci.map((v) => (
                      <tr key={v.nome} className="border-t border-nero/15 align-top">
                        <th scope="row" className="py-3 pr-3 font-medium">
                          {v.nome}
                          <span className={`${mono} block text-xs font-normal text-nero/65`}>{v.nota}</span>
                        </th>
                        <td className={`${mono} py-3 text-right text-base`}>{v.prezzo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {l.note && <p className="mt-4 rounded-2xl bg-sole/40 p-3 text-xs">{l.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* 05 Kristina */}
        <section className="py-16">
          <Titolo n="05">Chi ti accoglie</Titolo>
          <div className="mt-10 grid items-start gap-8 md:grid-cols-12">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] md:col-span-4 md:col-start-3">
              <Image src="/img/kristina.jpg" alt="Kristina Dendena" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="md:col-span-5">
              <h3 className="text-4xl font-extrabold uppercase leading-none">{kristina.nome}</h3>
              <p className={`${mono} mt-2 text-sm`}>{kristina.ruolo}</p>
              <div className="mt-6 space-y-4 leading-relaxed">
                {kristina.bio.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 06 Eventi + galeria */}
        <section className="py-16">
          <Titolo n="06">Eventi & studio</Titolo>
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {eventi.map((e, i) => (
              <li key={e.nome} className={`rounded-[2rem] p-6 ${["bg-menta", "bg-sole", "bg-cielo", "bg-rosa"][i]}`}>
                <h3 className="text-xl font-extrabold uppercase leading-none sm:text-2xl">{e.nome}</h3>
                <p className="mt-3 text-sm">{e.testo}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleria.slice(0, 6).map((g) => (
              <div key={g.src} className="relative aspect-square overflow-hidden rounded-[2rem]">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Contatos */}
      <footer id="contatti" className="scroll-mt-32 bg-nero text-carta">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-16 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className={`${mono} text-sm text-menta`}>07 — Contatti</p>
            <p className="mt-4 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
              Vieni a<br />
              trovarci<span className="text-sole">.</span>
            </p>
          </div>
          <dl className={`${mono} grid gap-6 text-sm sm:grid-cols-2 md:col-span-6`}>
            <div>
              <dt className="text-carta/60">Indirizzo</dt>
              <dd className="mt-1 text-base">
                <a href={contatti.mappa} className="underline decoration-menta underline-offset-4">
                  {contatti.indirizzo}
                  <br />
                  {contatti.cap}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-carta/60">Telefono / WhatsApp</dt>
              <dd className="mt-1 text-base">
                <a href={contatti.telefonoHref} className="underline decoration-menta underline-offset-4">
                  {contatti.telefono}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-carta/60">E-mail</dt>
              <dd className="mt-1 text-base">
                <a href={`mailto:${contatti.email}`} className="underline decoration-menta underline-offset-4">
                  {contatti.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-carta/60">Social</dt>
              <dd className="mt-2 flex gap-2">
                <a href={contatti.instagram} aria-label="Instagram" className="flex size-11 items-center justify-center rounded-full bg-carta text-nero">
                  <Instagram />
                </a>
                <a href={contatti.facebook} aria-label="Facebook" className="flex size-11 items-center justify-center rounded-full bg-carta text-nero">
                  <Facebook />
                </a>
                <a href={contatti.whatsapp} aria-label="WhatsApp" className="flex size-11 items-center justify-center rounded-full bg-menta text-nero">
                  <WhatsApp />
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <p className={`${mono} border-t border-carta/15 px-4 py-5 text-center text-xs text-carta/60`}>
          © 2026 YomaTime · {contatti.titolare} ·{" "}
          <Link href="/" className="underline">
            tutte le proposte
          </Link>
        </p>
      </footer>
    </div>
  );
}
