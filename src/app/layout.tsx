import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YomaTime — Il tempo per te",
  description:
    "Yoga, Pilates Reformer e Massaggi a Lumino (Ticino). Uno spazio in cui ti dedichi del tempo.",
  icons: { icon: "/img/logo.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="h-full antialiased scroll-smooth">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
