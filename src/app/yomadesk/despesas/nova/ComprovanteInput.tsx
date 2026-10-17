"use client";

import { useState } from "react";
import MaterialIcon from "@/components/MaterialIcon";

export default function ComprovanteInput({
  titulo,
  texto,
  botaoGaleria,
  botaoDocumentos,
  formatosSuportados,
}: {
  titulo: string;
  texto: string;
  botaoGaleria: string;
  botaoDocumentos: string;
  formatosSuportados: string;
}) {
  const [nomeArquivo, setNomeArquivo] = useState<string | null>(null);

  return (
    <label className="vidro-card flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-black/15 px-6 py-10 text-center transition-colors hover:border-carmesim/40">
      <input
        type="file"
        name="comprovante"
        accept="image/*,.pdf"
        className="sr-only"
        onChange={(e) => setNomeArquivo(e.target.files?.[0]?.name ?? null)}
      />
      <span className="flex size-12 items-center justify-center rounded-xl bg-black/[0.03] text-grafite-suave">
        <MaterialIcon name="document_scanner" className="text-[22px]" />
      </span>
      <span className="text-sm font-semibold text-grafite">{titulo}</span>
      <span className="max-w-[28ch] text-xs text-muted-foreground">
        {nomeArquivo ?? texto}
      </span>
      <span className="flex items-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-grafite-suave">
          <MaterialIcon name="image" className="text-[14px]" />
          {botaoGaleria}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-grafite-suave">
          <MaterialIcon name="description" className="text-[14px]" />
          {botaoDocumentos}
        </span>
      </span>
      <span className="text-[11px] text-muted-foreground">{formatosSuportados}</span>
    </label>
  );
}
