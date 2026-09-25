"use client";

import { useState } from "react";
import { listini } from "@/content/yoma";

export default function PrezziTabs() {
  const [attivo, setAttivo] = useState(listini[0].id);
  const listino = listini.find((l) => l.id === attivo)!;

  return (
    <div>
      <div role="tablist" aria-label="Listino prezzi" className="flex flex-wrap gap-x-8 gap-y-2 border-b border-inchiostro/15">
        {listini.map((l) => (
          <button
            key={l.id}
            role="tab"
            id={`tab-${l.id}`}
            aria-selected={attivo === l.id}
            aria-controls={`pannello-${l.id}`}
            onClick={() => setAttivo(l.id)}
            className={`-mb-px min-h-11 cursor-pointer border-b-2 pb-3 font-[family-name:var(--font-cormorant)] text-2xl transition-colors duration-200 ${
              attivo === l.id ? "border-menta-scura text-inchiostro" : "border-transparent text-inchiostro/50 hover:text-inchiostro"
            }`}
          >
            {l.titolo}
          </button>
        ))}
      </div>

      <ul role="tabpanel" id={`pannello-${listino.id}`} aria-labelledby={`tab-${listino.id}`} className="mt-4">
        {listino.voci.map((v) => (
          <li key={v.nome} className="flex items-baseline gap-3 border-b border-dotted border-inchiostro/20 py-4">
            <span className="flex-1">
              <span className="block text-base">{v.nome}</span>
              <span className="text-sm text-inchiostro/60">{v.nota}</span>
            </span>
            <span className="font-[family-name:var(--font-cormorant)] text-3xl lining-nums tabular-nums">
              {v.prezzo === "gratis" ? (
                <em>gratis</em>
              ) : (
                <>
                  <span className="mr-1 align-top font-[family-name:var(--font-manrope)] text-sm text-inchiostro/60">CHF</span>
                  {v.prezzo}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
      {listino.note && <p className="mt-5 text-sm italic text-menta-scura">{listino.note}</p>}
    </div>
  );
}
