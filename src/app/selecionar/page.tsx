import Link from "next/link";
import { Check, CalendarPlus, LayoutTemplate } from "lucide-react";
import SeletorSistema from "@/components/SeletorSistema";
import { obterDicionarioPainel } from "@/lib/sistema-locale";

export default async function SelecionarDestino() {
  const { locale, t } = await obterDicionarioPainel();

  const destinos = [
    {
      href: "/yomadesk",
      icon: CalendarPlus,
      titulo: t.selecionar.yomadesk.titulo,
      descricao: t.selecionar.yomadesk.descricao,
      checklist: t.selecionar.yomadesk.checklist,
    },
    {
      href: "/yomapanel",
      icon: LayoutTemplate,
      titulo: t.selecionar.yomapanel.titulo,
      descricao: t.selecionar.yomapanel.descricao,
      checklist: t.selecionar.yomapanel.checklist,
    },
  ];

  return (
    <main className="vidro flex min-h-dvh flex-col bg-vidro text-grafite">
      <header className="flex h-14 shrink-0 items-center px-6 text-sm font-medium">YomaTime</header>

      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">{t.selecionar.titulo}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.selecionar.subtitulo}</p>
          </div>

          <div className="mt-4 flex justify-center">
            <SeletorSistema atual={locale} label={t.sistemaEm} />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {destinos.map((d) => (
              <div key={d.href} className="flex flex-col rounded-2xl border border-border bg-white/75 backdrop-blur-[24px] p-6 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)]">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-carmesim/15 text-carmesim">
                  <d.icon className="size-7" />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{d.titulo}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{d.descricao}</p>

                <div className="mt-4 border-t border-border pt-4">
                  <ul className="space-y-2">
                    {d.checklist.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-grafite/80">
                        <Check className="size-3.5 shrink-0 text-carmesim" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={d.href}
                  className="mt-6 flex h-10 items-center justify-center rounded-lg bg-carmesim text-sm font-medium text-white transition-colors hover:bg-carmesim-escuro"
                >
                  {t.selecionar.abrir} {d.titulo}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="flex h-12 shrink-0 items-center justify-center text-xs text-muted-foreground">© YomaTime</footer>
    </main>
  );
}
