// Autenticação simples do /admin: senha única (ADMIN_PASSWORD) + cookie assinado.
// Usa Web Crypto (funciona tanto no middleware/edge quanto em server actions).
export const SESSION_COOKIE = "yoma_admin_session";
const DURACAO_MS = 1000 * 60 * 60 * 24 * 30; // 30 dias

function segredo() {
  const s = process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD não configurada.");
  return s;
}

async function hmac(dados: string) {
  const chave = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(segredo()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const assinatura = await crypto.subtle.sign("HMAC", chave, new TextEncoder().encode(dados));
  return Array.from(new Uint8Array(assinatura))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function criarSessao(): Promise<string> {
  const expira = Date.now() + DURACAO_MS;
  const assinatura = await hmac(String(expira));
  return `${expira}.${assinatura}`;
}

export async function sessaoValida(valor: string | undefined): Promise<boolean> {
  if (!valor) return false;
  const [expira, assinatura] = valor.split(".");
  if (!expira || !assinatura) return false;
  if (Date.now() > Number(expira)) return false;
  try {
    const esperado = await hmac(expira);
    return esperado === assinatura;
  } catch {
    return false;
  }
}

export function senhaConfere(tentativa: string): boolean {
  return tentativa === process.env.ADMIN_PASSWORD;
}
