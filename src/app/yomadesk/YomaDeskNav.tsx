"use client";

import { usePathname } from "next/navigation";
import MaterialIcon from "@/components/MaterialIcon";
import {
  AnimatedSidebarGroup,
  AnimatedSidebarGroupContent,
  AnimatedSidebarGroupLabel,
  AnimatedSidebarMenu,
  AnimatedSidebarMenuButton,
  AnimatedSidebarMenuItem,
} from "@/components/motion/animated-sidebar";

type Rotulos = {
  dashboard: string;
  clientes: string;
  faturas: string;
  importar: string;
  despesas: string;
  itens: string;
  analises: string;
  definicoes: string;
  personalizar: string;
  empresa: string;
};
type Badges = { clientes?: number; faturas?: number };

function Badge({ valor }: { valor: number }) {
  return (
    <span className="rounded-full border border-black/[0.06] bg-white/60 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-grafite-suave">
      {valor}
    </span>
  );
}

function PontoAtivo() {
  return <span className="size-1.5 rounded-full bg-carmesim" />;
}

export default function YomaDeskNav({ rotulos, badges = {} }: { rotulos: Rotulos; badges?: Badges }) {
  const pathname = usePathname();
  const ITENS_MENU = [
    { href: "/yomadesk", label: rotulos.dashboard, icon: "space_dashboard", contagem: undefined },
    { href: "/yomadesk/faturas", label: rotulos.faturas, icon: "receipt_long", contagem: badges.faturas },
    { href: "/yomadesk/despesas", label: rotulos.despesas, icon: "account_balance_wallet", contagem: undefined },
    { href: "/yomadesk/analises", label: rotulos.analises, icon: "analytics", contagem: undefined },
    { href: "/yomadesk/clientes", label: rotulos.clientes, icon: "groups", contagem: badges.clientes },
    { href: "/yomadesk/itens", label: rotulos.itens, icon: "inventory_2", contagem: undefined },
    { href: "/yomadesk/importar", label: rotulos.importar, icon: "upload", contagem: undefined },
  ];
  const ITENS_DEFINICOES = [
    { href: "/yomadesk/personalizar", label: rotulos.personalizar, icon: "receipt" },
    { href: "/yomadesk/empresa", label: rotulos.empresa, icon: "storefront" },
  ];

  function ehAtivo(href: string) {
    return href === "/yomadesk" ? pathname === "/yomadesk" : pathname.startsWith(href);
  }

  return (
    <>
      <AnimatedSidebarGroup>
        <AnimatedSidebarGroupContent>
          <AnimatedSidebarMenu>
            {ITENS_MENU.map((item) => (
              <AnimatedSidebarMenuItem key={item.href}>
                <AnimatedSidebarMenuButton
                  href={item.href}
                  icon={<MaterialIcon name={item.icon} className="text-[18px]" />}
                  isActive={ehAtivo(item.href)}
                  badge={item.contagem !== undefined ? <Badge valor={item.contagem} /> : undefined}
                >
                  {item.label}
                </AnimatedSidebarMenuButton>
              </AnimatedSidebarMenuItem>
            ))}
          </AnimatedSidebarMenu>
        </AnimatedSidebarGroupContent>
      </AnimatedSidebarGroup>
      <AnimatedSidebarGroup>
        <AnimatedSidebarGroupLabel>{rotulos.definicoes}</AnimatedSidebarGroupLabel>
        <AnimatedSidebarGroupContent>
          <div className="ml-4 space-y-0.5 border-l border-black/[0.06] pl-3">
            <AnimatedSidebarMenu>
              {ITENS_DEFINICOES.map((item) => {
                const ativo = ehAtivo(item.href);
                return (
                  <AnimatedSidebarMenuItem key={item.href}>
                    <AnimatedSidebarMenuButton
                      href={item.href}
                      icon={<MaterialIcon name={item.icon} className="text-[18px]" />}
                      isActive={ativo}
                      badge={ativo ? <PontoAtivo /> : undefined}
                    >
                      {item.label}
                    </AnimatedSidebarMenuButton>
                  </AnimatedSidebarMenuItem>
                );
              })}
            </AnimatedSidebarMenu>
          </div>
        </AnimatedSidebarGroupContent>
      </AnimatedSidebarGroup>
    </>
  );
}
