"use client";

import { useEffect, useRef } from "react";

// Fundo fixo: avorio liso com uma única mancha de menta muito sutil
// (pedido da Kristina: tirar o degradê multicolor, deixar mais suave)
// e grão de papel por cima.
export default function Aura() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const aggiorna = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      el.style.setProperty("--p", (window.scrollY / max).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(aggiorna);
    };
    aggiorna();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const macchia = "absolute rounded-full blur-[110px] will-change-transform";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-avorio [--p:0]">
      <div
        className={`${macchia} left-[-10%] top-[-15%] size-[65vmax] bg-menta/18`}
        style={{ transform: "translate3d(calc(var(--p) * 15vw), calc(var(--p) * 25vh), 0)" }}
      />
      {/* grão de papel */}
      <svg className="absolute inset-0 size-full opacity-[0.18] mix-blend-multiply">
        <filter id="grana">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.27  0 0 0 0 0.24  0 0 0 0.55 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grana)" />
      </svg>
    </div>
  );
}
