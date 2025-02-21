import { NextRequest, NextResponse } from "next/server";

import { COOKIE_NAME, isSessionValid } from "./utils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Validar si hay una sesión válida
  const hasSession = await isSessionValid();

  // Excluir archivos estáticos y APIs del middleware
  // if (
  //   pathname.startsWith("/_next") || // Archivos generados por Next.js
  //   pathname.startsWith("/static") || // Archivos estáticos personalizados
  //   pathname.startsWith("/api") || // Rutas de API
  //   pathname.includes(".") // Archivos como .css, .js, .png, etc.
  // ) {
  //   return NextResponse.next();
  // }

  if (pathname.startsWith("/auth")) {
    if (hasSession) {
      console.log("Hay token, redirigiendo a /dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  // Validar si hay un token en las cookies solo para rutas protegidas
  if (pathname.startsWith("/dashboard")) {
    if (!hasSession) {
      console.log("No hay token, redirigiendo a /auth/login");
      const response = NextResponse.redirect(new URL("/auth/login", request.nextUrl));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}