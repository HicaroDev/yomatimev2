import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessaoValida } from "@/lib/admin-auth";

export async function proxy(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  if (await sessaoValida(cookie)) return NextResponse.next();

  const login = new URL("/admin/login", req.url);
  login.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
