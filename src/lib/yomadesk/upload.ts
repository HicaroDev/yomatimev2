import { put } from "@vercel/blob";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Mesmo padrão de upload já usado em src/app/yomapanel/actions.ts (enviarFoto):
// Vercel Blob em produção, fallback local em dev sem token configurado.
export async function enviarArquivo(arquivo: File, pasta: string): Promise<string> {
  const nomeArquivo = `${Date.now()}-${arquivo.name}`;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`yoma/${pasta}/${nomeArquivo}`, arquivo, { access: "public" });
    return blob.url;
  }
  if (process.env.NODE_ENV !== "production") {
    const destino = path.join(process.cwd(), "public", "uploads", pasta);
    await mkdir(destino, { recursive: true });
    await writeFile(path.join(destino, nomeArquivo), Buffer.from(await arquivo.arrayBuffer()));
    return `/uploads/${pasta}/${nomeArquivo}`;
  }
  throw new Error("BLOB_READ_WRITE_TOKEN não configurado.");
}
