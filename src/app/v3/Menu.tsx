"use client";

import { useState } from "react";
import { Menu as IconaMenu } from "@/components/icons";
import { nav, whatsappMsg } from "@/content/yoma";

export default function Menu() {
  const [aperto, setAperto] = useState(false);
  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={aperto}
        aria-controls="menu-v3"
        aria-label={aperto ? "Chiudi il menu" : "Apri il menu"}
        onClick={() => setAperto(!aperto)}
        className="flex size-11 cursor-pointer items-center justify-center"
      >
        <IconaMenu />
      </button>
      <nav
        id="menu-v3"
        aria-label="Menu mobile"
        hidden={!aperto}
        className="absolute right-0 top-13 w-64 border border-oro/40 bg-avorio p-5 shadow-xl shadow-notte/10"
      >
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setAperto(false)}
                className="block py-3 font-[family-name:var(--font-bodoni)] text-xl"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={whatsappMsg("Ciao Kristina, vorrei prenotare")}
              className="mt-3 block border-t border-oro/40 pt-4 text-sm uppercase tracking-[0.25em] text-salvia"
            >
              Prenota su WhatsApp
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
