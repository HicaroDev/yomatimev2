import {
  Bricolage_Grotesque,
  Cormorant_Garamond,
  DM_Mono,
  DM_Sans,
  Instrument_Serif,
  Manrope,
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

// V3 · Radiate
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
export const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dmmono" });
