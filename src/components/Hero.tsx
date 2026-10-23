"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Manrope, Parisienne } from "next/font/google";
import styles from "./Hero.module.css";

const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-hero" });
const script = Parisienne({ subsets: ["latin"], weight: "400", variable: "--font-script" });

// Velocidade de cada camada no parallax (vw deslocados ao fim do trecho de scroll) — fundo quase
// parado, texto sai rápido pra esquerda e some, mulher sai rápido pra direita, logo só anda um
// pouco mas dobra de tamanho (a marca cresce enquanto as outras camadas saem de cena).
const VELOCIDADE = { bg: -3, logo: -3, mulher: 40, texto: -32 };
const ESCALA_LOGO = { de: 0.5, para: 1 };
// progresso 0→1 completo em 28% da altura da tela de scroll
const TRECHO_SCROLL = 0.28;

export default function Hero({ linha1, accento, lead }: { linha1: string; accento: string; lead: string }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mulherRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function aplicar() {
      raf = 0;
      // no celular (<=900px) o parallax fica desligado — camadas ficam paradas no estado de
      // repouso (logo pequena, mulher e texto no lugar); só roda em tablet/desktop
      const ehMobile = window.matchMedia("(max-width: 900px)").matches;
      const p = ehMobile ? 0 : Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * TRECHO_SCROLL)));
      // texto e mulher terminam de sair em 80% do trecho — sobra só a logo depois disso
      const q = Math.min(1, p / 0.8);
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${p * VELOCIDADE.bg}vw, 0, 0)`;
        bgRef.current.style.opacity = `${1 - p * 0.3}`;
      }
      if (logoRef.current) {
        const escala = ESCALA_LOGO.de + p * (ESCALA_LOGO.para - ESCALA_LOGO.de);
        // sem fade — a logo fica sempre opaca, só muda de tamanho/posição
        logoRef.current.style.transform = `translate3d(${p * VELOCIDADE.logo}vw, 0, 0) scale(${escala})`;
      }
      if (mulherRef.current) {
        mulherRef.current.style.transform = `translate3d(${q * VELOCIDADE.mulher}vw, 0, 0)`;
        mulherRef.current.style.opacity = `${1 - q * 0.5}`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${q * VELOCIDADE.texto}vw, -14vh, 0)`;
        contentRef.current.style.opacity = `${1 - q}`;
      }
    }
    function agendar() {
      if (!raf) raf = requestAnimationFrame(aplicar);
    }

    agendar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`${styles.hero} ${sans.variable} ${script.variable}`} aria-label="YomaTime">
      <div ref={bgRef} className={styles.bgPlate}>
        <div className={styles.bgPlateInner}>
          <Image src="/img/hero-bg-plate.png" alt="" fill priority sizes="100vw" />
        </div>
      </div>
      <div ref={logoRef} className={styles.logoLayer}>
        <Image src="/img/hero-logo-mark.png" alt="" fill sizes="100vw" />
      </div>
      <div ref={mulherRef} className={styles.womanLayer}>
        <div className={styles.womanLayerInner}>
          <Image src="/img/hero-woman-cutout.png" alt="" fill sizes="56vw" />
        </div>
      </div>
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <div ref={contentRef} className={styles.content}>
          <h1 className={styles.title}>
            {linha1} <span className={styles.script}>{accento}</span>
          </h1>

          <p className={styles.lead}>{lead}</p>
        </div>
      </div>
    </section>
  );
}
