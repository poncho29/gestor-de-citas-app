import { NextRequest, NextResponse } from "next/server";

import { COOKIE_NAME, isSessionValid } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname !== "/auth/login") {
    const hasSession = isSessionValid(COOKIE_NAME);

    if (hasSession) return;

    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
}