import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = !!auth?.user?.email;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isAuthPage = nextUrl.pathname.startsWith("/auth");

      if (isDashboard && !isAuthenticated) {
        const url = new URL("/auth/login", nextUrl.origin);
        url.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(url);
      }

      if (isAuthPage && isAuthenticated) {
        return Response.redirect(new URL("/dashboard", nextUrl.origin));
      }

      return true;
    },
  },

  trustHost: true,
  providers: [], // providers added in auth.ts
};