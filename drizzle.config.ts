import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/yomadesk/schema.ts",
  out: "./src/lib/yomadesk/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Conexão direta (não-pooled) pra migrations, como o Neon recomenda.
    url: process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "",
  },
});
