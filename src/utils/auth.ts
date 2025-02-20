'use server';

import { cookies } from "next/headers";

export const COOKIE_NAME = "__GDC__SESSION__";

export function isSessionValid(cookie: string | undefined | null): string | undefined {
  if (!cookie) return undefined;

  const _cookies = cookies();
  return _cookies.get(COOKIE_NAME)?.value;
}

export function createSession(token: string) {
  const expireAt = new Date(Date.now() + 86400 * 1000);
  const _cookies = cookies();

  _cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expireAt,
    path: "/"
  });
}

export function removeSession() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}
