import { KeyRound } from "lucide-react";
import { login } from "../yomapanel/actions";

export default async function LoginAdmin({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string; next?: string }>;
}) {
  const { erro, next } = await searchParams;
  const destino = next?.startsWith("/yomadesk") ? "YomaDesk" : next?.startsWith("/yomapanel") ? "YomaTime · Painel" : "YomaTime";

  return (
    <main className="vidro relative flex min-h-dvh flex-col bg-vidro text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/studio-sala.jpg" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-grafite/25 backdrop-blur-[3px]" />

      <header className="relative z-10 flex h-14 shrink-0 items-center px-6 text-sm font-medium">YomaTime</header>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <form
            action={login}
            className="rounded-2xl border border-white/80 bg-white/90 p-8 text-grafite shadow-[0_20px_48px_-8px_rgba(15,23,42,0.25),0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-[32px]"
          >
            <div className="flex justify-center">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-carmesim/15 text-carmesim">
                <KeyRound className="size-6" />
              </span>
            </div>
            <h1 className="mt-4 text-center text-xl font-semibold">{destino}</h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">Acesso restrito à equipe.</p>

            <input type="hidden" name="next" value={next ?? "/selecionar"} />
            <label className="mt-8 block text-sm">
              <span className="text-grafite/70">Senha</span>
              <input
                type="password"
                name="senha"
                required
                autoFocus
                className="mt-1.5 h-10 w-full rounded-lg border border-border bg-white px-3.5 text-sm outline-none transition-colors focus:border-carmesim focus:ring-2 focus:ring-carmesim/15"
              />
            </label>
            {erro && <p className="mt-3 text-sm text-red-600">Senha incorreta.</p>}

            <button
              type="submit"
              className="mt-6 h-10 w-full rounded-lg bg-carmesim px-4 text-sm font-medium text-white transition-colors hover:bg-carmesim-escuro"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      <footer className="relative z-10 flex h-12 shrink-0 items-center justify-center text-xs text-white/70">© YomaTime</footer>
    </main>
  );
}
