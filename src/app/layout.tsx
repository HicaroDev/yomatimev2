import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getColors } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "YomaTime — Il tempo per te",
  description:
    "Yoga, Pilates Reformer e Massaggi a Lumino (Ticino). Uno spazio in cui ti dedichi del tempo.",
  icons: { icon: "/img/logo.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cores = await getColors();
  const entradas = Object.entries(cores);
  return (
    <html lang="it" className="h-full antialiased scroll-smooth">
      <head>
        {entradas.length > 0 && (
          <style>{`:root{${entradas.map(([k, v]) => `--color-${k}:${v};`).join("")}}`}</style>
        )}
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
