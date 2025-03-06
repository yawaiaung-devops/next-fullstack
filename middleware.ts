import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("auth");

  /**
   * * IF cookie has a token => user already login => redirect => home
   * * cookie does not have a token => redirect => login page
   */

  const path = request.nextUrl.pathname;
  if (!cookie?.value && path === "/home") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (cookie?.value && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
};
