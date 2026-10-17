import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessaoValida } from "@/lib/yomapanel-auth";

const AREA_PROTEGIDA = /^\/(yomapanel|yomadesk|selecionar)(\/|$)/;

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (AREA_PROTEGIDA.test(pathname)) {
    const cookie = req.cookies.get(SESSION_COOKIE)?.value;
    if (await sessaoValida(cookie)) return NextResponse.next();
    const login = new URL("/login", req.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  // Site público: "it" é o idioma padrão, sem prefixo na URL — /en e /pt
  // continuam aparentes. O header x-locale carrega o idioma pro layout raiz
  // conseguir setar <html lang> sem precisar de outro layout.tsx por idioma.
  const locale = pathname.startsWith("/en") ? "en" : pathname.startsWith("/pt") ? "pt" : "it";
  const headers = new Headers(req.headers);
  headers.set("x-locale", locale);

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/it", req.url), { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/yomapanel", "/yomapanel/(.*)", "/yomadesk", "/yomadesk/(.*)", "/selecionar", "/", "/it", "/en", "/pt"],
};
