import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};

export default auth((req: NextAuthRequest) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth?.user?.email;

  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    const url = new URL("/auth/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});