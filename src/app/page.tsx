export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-between px-6 py-10 sm:px-12 sm:py-14">
      <p className="font-serif text-2xl tracking-[0.2em]">YOMATIME</p>

      <section className="max-w-2xl">
        <p className="mb-6 text-sm uppercase tracking-[0.25em] text-clay">Lumino · Ticino</p>
        <h1 className="font-serif text-5xl leading-[1.05] sm:text-7xl">
          Il tempo <em className="text-clay">per te</em>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed">
          Yoga, Pilates e Massaggi per ritrovare energia, equilibrio e benessere.
          Il nuovo sito è in arrivo.
        </p>
      </section>

      <footer className="flex flex-col gap-1 text-sm sm:flex-row sm:gap-8">
        <span>Via Bellinzona 61, 6533 Lumino</span>
        <a href="https://wa.me/41786222815" className="underline underline-offset-4">
          WhatsApp 078 622 28 15
        </a>
        <a href="mailto:yomatime@gmail.com" className="underline underline-offset-4">
          yomatime@gmail.com
        </a>
      </footer>
    </main>
  );
}
