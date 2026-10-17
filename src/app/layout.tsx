import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import "./globals.css";
import { getColors } from "@/lib/content-store";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const METADATA_POR_IDIOMA: Record<string, { title: string; description: string }> = {
  it: {
    title: "YomaTime — Il tempo per te",
    description: "Yoga, Pilates Reformer e Massaggi a Lumino (Ticino). Uno spazio in cui ti dedichi del tempo.",
  },
  en: {
    title: "YomaTime — Time for you",
    description: "Yoga, Pilates Reformer and Massage in Lumino (Ticino). A space where you take time for yourself.",
  },
  pt: {
    title: "YomaTime — O tempo para você",
    description: "Yoga, Pilates Reformer e Massagens em Lumino (Ticino). Um espaço em que você dedica tempo a si mesma.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = (await headers()).get("x-locale") ?? "it";
  const { title, description } = METADATA_POR_IDIOMA[lang] ?? METADATA_POR_IDIOMA.it;
  return { title, description, icons: { icon: "/img/logo.png" } };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1 };
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [cores, cabecalhos] = await Promise.all([getColors(), headers()]);
  const entradas = Object.entries(cores);
  const lang = cabecalhos.get("x-locale") ?? "it";
  return (
    <html lang={lang} className={`h-full antialiased scroll-smooth ${geist.variable}`}>
      <head>
        {entradas.length > 0 && (
          <style>{`:root{${entradas.map(([k, v]) => `--color-${k}:${v};`).join("")}}`}</style>
        )}
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
