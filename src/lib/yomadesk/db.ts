// Client Drizzle/Neon do módulo de gestão (clientes, créditos, faturas).
// Separado do Redis do /yomapanel (src/lib/content-store.ts) — dados relacionais,
// não um blob de conteúdo.
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

function url() {
  // Pooled primeiro: driver HTTP do Neon roda em serverless/edge, com muitas
  // invocações curtas e concorrentes — a conexão com pooler é a recomendada
  // pra isso (a direta fica reservada pra migrations).
  return (
    process.env.DATABASE_URL_POOLED ??
    process.env.POSTGRES_URL_POOLED ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL
  );
}

export const bancoConfigurado = Boolean(url());

let instancia: ReturnType<typeof drizzle<typeof schema>> | null = null;

// Códigos do Postgres que significam "conexão ok, mas falta rodar a migration
// (`npm run db:push`)": 42P01 (tabela/relation não existe) e 42703 (coluna não
// existe — acontece quando o schema.ts ganha uma coluna nova numa tabela já
// existente, como `vencimento_em` em `faturas` no YomaDeskV2).
const CODIGOS_SCHEMA_DESATUALIZADO = new Set(["42P01", "42703"]);

export function tabelaNaoExiste(erro: unknown): boolean {
  let atual = erro;
  for (let i = 0; i < 5 && atual; i++) {
    if (typeof atual === "object" && "code" in atual && CODIGOS_SCHEMA_DESATUALIZADO.has((atual as { code?: string }).code ?? "")) return true;
    atual = (atual as { cause?: unknown })?.cause;
  }
  return false;
}

export function banco() {
  if (instancia) return instancia;
  const conexao = url();
  if (!conexao) {
    throw new Error(
      "Banco de dados não configurado: defina DATABASE_URL (ou POSTGRES_URL) nas env vars da Vercel (Storage → Create Database → Neon)."
    );
  }
  instancia = drizzle(neon(conexao), { schema });
  return instancia;
}
