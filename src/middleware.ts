import { NextRequest, NextResponse } from "next/server";

import { COOKIE_NAME, isSessionValid } from "./utils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Validar si hay una sesión válida
  const hasSession = await isSessionValid();

  if (pathname.startsWith("/auth")) {
    if (hasSession) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  // Validar si hay un token en las cookies solo para rutas protegidas
  if (pathname.startsWith("/dashboard")) {
    if (!hasSession) {
      const response = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ]
}