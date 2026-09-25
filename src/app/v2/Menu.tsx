"use client";

import { useEffect, useState } from "react";
import { contatti, nav } from "@/content/yoma";

export default function Menu() {
  const [aperto, setAperto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = aperto ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAperto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aperto]);

  return (
    <>
      <button
        type="button"
        aria-expanded={aperto}
        aria-controls="menu-v2"
        onClick={() => setAperto(!aperto)}
        className="relative z-10 flex min-h-11 cursor-pointer items-center rounded-full border border-crema/30 bg-eucalipto/60 px-5 text-sm uppercase tracking-[0.2em] backdrop-blur-sm"
      >
        {aperto ? "Chiudi" : "Menu"}
      </button>
      <nav
        id="menu-v2"
        aria-label="Principale"
        hidden={!aperto}
        className="fixed inset-0 flex flex-col justify-center bg-eucalipto px-6 sm:px-16"
      >
        <ul className="space-y-2">
          {nav.map((n, i) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={() => setAperto(false)}
                className="flex items-baseline gap-4 font-[family-name:var(--font-instrument)] text-5xl transition-colors hover:text-menta sm:text-7xl"
              >
                <span className="font-[family-name:var(--font-dmsans)] text-sm text-menta">0{i + 1}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-sm text-crema/70">
          {contatti.indirizzo}, {contatti.cap} · {contatti.telefono}
        </p>
      </nav>
    </>
  );
}
