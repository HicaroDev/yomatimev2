import {
  Bodoni_Moda,
  Cormorant_Garamond,
  DM_Sans,
  Instrument_Serif,
  Jost,
  Manrope,
  Pinyon_Script,
} from "next/font/google";

// V1 · Luce
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
export const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

// V2 · Respiro
export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});
export const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

// V3 · Firma — Jost é da mesma família geométrica do "YOMA" do logo;
// Pinyon Script faz o papel do "time" manuscrito.
export const jost = Jost({ subsets: ["latin"], weight: ["200", "300", "400", "500"], variable: "--font-jost" });
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
});
export const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon" });
