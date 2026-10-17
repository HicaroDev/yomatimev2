import Link from "next/link";
import MaterialIcon from "@/components/MaterialIcon";
import {
  AnimatedSidebar,
  AnimatedSidebarContent,
  AnimatedSidebarFooter,
  AnimatedSidebarHeader,
  AnimatedSidebarInset,
  AnimatedSidebarProvider,
  AnimatedSidebarRail,
  AnimatedSidebarTrigger,
} from "@/components/motion/animated-sidebar";
import SeletorSistema from "@/components/SeletorSistema";
import { obterDicionarioPainel } from "@/lib/sistema-locale";
import { logout } from "@/app/yomapanel/actions";
import { bancoConfigurado, tabelaNaoExiste } from "@/lib/yomadesk/db";
import { visaoGeral } from "@/lib/yomadesk/queries";
import YomaDeskNav from "./YomaDeskNav";

// Contagens reais pros badges da sidebar — nunca números fictícios. Se o banco não
// estiver configurado ainda ou faltarem as tabelas, os badges somem (undefined).
async function contagens() {
  if (!bancoConfigurado) return {};
  try {
    const { totalClientes, faturasEmAberto } = await visaoGeral();
    return { clientes: totalClientes, faturas: faturasEmAberto.length };
  } catch (erro) {
    if (!tabelaNaoExiste(erro)) throw erro;
    return {};
  }
}

export default async function YomaDeskLayout({ children }: { children: React.ReactNode }) {
  const [{ locale, t }, badges] = await Promise.all([obterDicionarioPainel(), contagens()]);

  return (
    <>
      {/* Ícones "Material Symbols" — identidade "YomaDesk / Swiss Enterprise" dos
          mockups do YomaDeskV2, carregada só aqui (não no site público). App Router
          deduplica e hoisteia pro <head>, persistindo entre navegações client-side
          dentro deste layout — o aviso do eslint é sobre o Pages Router, não se aplica. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
      />
      <AnimatedSidebarProvider className="vidro bg-vidro">
        <AnimatedSidebar
          ariaLabel={t.yomadesk.marca}
          panelClassName="border-r border-black/[0.08] bg-white/65 backdrop-blur-[16px]"
        >
          <AnimatedSidebarHeader>
            <div className="flex items-center justify-between gap-2 px-2 py-1">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-carmesim text-white shadow-sm">
                  <MaterialIcon name="widgets" filled className="text-[18px]" />
                </span>
                <span className="flex min-w-0 flex-col leading-none group-data-[state=collapsed]/sidebar:hidden">
                  <span className="truncate text-sm font-semibold text-foreground">{t.yomadesk.marca}</span>
                  <span className="truncate text-[11px] text-muted-foreground">{t.yomadesk.marcaSubtitulo}</span>
                </span>
              </div>
              <Link
                href="/selecionar"
                title={t.trocarArea}
                className="text-muted-foreground transition-colors hover:text-foreground group-data-[state=collapsed]/sidebar:hidden"
              >
                <MaterialIcon name="apps" className="text-[18px]" />
              </Link>
            </div>
            <SeletorSistema atual={locale} label={t.sistemaEm} />
          </AnimatedSidebarHeader>
          <AnimatedSidebarContent>
            <YomaDeskNav rotulos={t.yomadesk.menu} badges={badges} />
          </AnimatedSidebarContent>
          <AnimatedSidebarFooter>
            <div className="flex items-center gap-2.5 rounded-xl px-3 py-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-carmesim/10 text-carmesim">
                <MaterialIcon name="person" className="text-[18px]" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground group-data-[state=collapsed]/sidebar:hidden">
                {t.equipe}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  title={t.sair}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground group-data-[state=collapsed]/sidebar:hidden"
                >
                  <MaterialIcon name="logout" className="text-[18px]" />
                </button>
              </form>
            </div>
          </AnimatedSidebarFooter>
          <AnimatedSidebarRail />
        </AnimatedSidebar>
        <AnimatedSidebarInset className="bg-transparent">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 md:hidden">
            <AnimatedSidebarTrigger>
              <MaterialIcon name="menu" className="text-[18px]" />
            </AnimatedSidebarTrigger>
            <span className="text-sm font-medium text-foreground">{t.yomadesk.marca}</span>
            <Link href="/selecionar" title={t.trocarArea} className="ml-auto text-muted-foreground transition-colors hover:text-foreground">
              <MaterialIcon name="apps" className="text-[18px]" />
            </Link>
          </header>
          {children}
        </AnimatedSidebarInset>
      </AnimatedSidebarProvider>
    </>
  );
}
