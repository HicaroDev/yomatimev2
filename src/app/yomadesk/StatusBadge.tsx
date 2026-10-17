import type { Locale } from "@/content/yoma";
import { getPainelDicionario } from "@/dictionaries/painel";

const ESTILOS: Record<string, string> = {
  rascunho: "border-border bg-muted text-muted-foreground",
  enviada: "border-acento-azul/30 bg-acento-azul/10 text-acento-azul",
  paga: "border-green-300 bg-green-50 text-green-700",
  vencida: "border-red-300 bg-red-50 text-red-700",
  arquivada: "border-border bg-muted/60 text-muted-foreground/70",
};

export default function StatusBadge({ status, locale = "it" }: { status: string; locale?: Locale }) {
  const estilo = ESTILOS[status] ?? "border-border bg-muted text-muted-foreground";
  const rotulos: Record<string, string> = getPainelDicionario(locale).yomadesk.status;
  const rotulo = rotulos[status] ?? status;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${estilo}`}>
      {rotulo}
    </span>
  );
}
