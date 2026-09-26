"use client";

import { useEffect, useRef } from "react";

// Fundo fixo: manchas de cor suaves (menta, sálvia, champanhe, rosa antigo)
// que se deslocam devagar conforme a página rola, com grão de papel por cima.
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

  const macchia = "absolute rounded-full blur-[90px] will-change-transform";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-avorio [--p:0]">
      <div
        className={`${macchia} left-[-15%] top-[-10%] size-[70vmax] bg-menta/70`}
        style={{ transform: "translate3d(calc(var(--p) * 30vw), calc(var(--p) * 60vh), 0)" }}
      />
      <div
        className={`${macchia} right-[-20%] top-[10%] size-[60vmax] bg-champagne`}
        style={{ transform: "translate3d(calc(var(--p) * -25vw), calc(var(--p) * 40vh), 0)" }}
      />
      <div
        className={`${macchia} bottom-[-25%] left-[10%] size-[55vmax] bg-cipria/60`}
        style={{ transform: "translate3d(calc(var(--p) * 20vw), calc(var(--p) * -50vh), 0)" }}
      />
      <div
        className={`${macchia} bottom-[-10%] right-[-10%] size-[40vmax] bg-salvia/35`}
        style={{ transform: "translate3d(calc(var(--p) * -15vw), calc(var(--p) * -30vh), 0)" }}
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
