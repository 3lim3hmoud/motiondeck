import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { ROUTES } from "@/constants/routes";

const PROTECTED_PREFIXES = ["/dashboard", "/workspace", "/editor", "/import", "/settings", "/billing", "/notifications", "/analytics", "/activity", "/shared", "/trash", "/search"];
const AUTH_PAGES = ["/login", "/signup"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth);

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL(ROUTES.login, req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif)$).*)"],
};
