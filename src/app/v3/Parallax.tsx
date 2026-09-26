"use client";

import { useEffect, useRef } from "react";

// Um único listener de scroll para todos os elementos com parallax.
type Item = { el: HTMLElement; speed: number };
const items = new Set<Item>();
let raf = 0;
let ligado = false;

function atualizar() {
  raf = 0;
  const meio = window.innerHeight / 2;
  for (const { el, speed } of items) {
    // Mede o pai (que não se move) para não criar efeito em cascata.
    const r = (el.parentElement ?? el).getBoundingClientRect();
    if (r.bottom < -200 || r.top > window.innerHeight + 200) continue;
    const delta = r.top + r.height / 2 - meio;
    el.style.transform = `translate3d(0, ${(-delta * speed).toFixed(1)}px, 0)`;
  }
}

function agendar() {
  if (!raf) raf = requestAnimationFrame(atualizar);
}

function ligar() {
  if (ligado) return;
  ligado = true;
  window.addEventListener("scroll", agendar, { passive: true });
  window.addEventListener("resize", agendar);
}

export default function Parallax({
  speed = 0.15,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const item = { el, speed };
    items.add(item);
    ligar();
    agendar();
    return () => {
      items.delete(item);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
