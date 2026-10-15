import { login } from "../actions";

export default async function LoginAdmin({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string; next?: string }>;
}) {
  const { erro, next } = await searchParams;
  return (
    <main className="flex min-h-dvh items-center justify-center bg-avorio px-4 text-notte">
      <form action={login} className="w-full max-w-sm border border-oro/40 bg-white/60 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold">YomaTime · Painel</h1>
        <p className="mt-1 text-sm text-notte/70">Entre com a senha para editar o site.</p>
        <input type="hidden" name="next" value={next ?? "/admin"} />
        <label className="mt-6 block text-sm">
          Senha
          <input
            type="password"
            name="senha"
            required
            autoFocus
            className="mt-1 w-full border border-oro/50 bg-white px-3 py-2 outline-none focus:border-salvia"
          />
        </label>
        {erro && <p className="mt-3 text-sm text-red-600">Senha incorreta.</p>}
        <button type="submit" className="mt-6 w-full bg-notte px-4 py-2 text-avorio transition-colors hover:bg-salvia">
          Entrar
        </button>
      </form>
    </main>
  );
}
