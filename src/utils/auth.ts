'use server';

import { cookies } from "next/headers";

import { COOKIE_NAME } from "./api";

// import { validateTokenAction } from "@/actions";

export async function isSessionValid() {
  if (!COOKIE_NAME) return undefined;

  const cookieSession = cookies().get(COOKIE_NAME)?.value;

  if (!cookieSession) return undefined;

  const { token, createTime } = JSON.parse(cookieSession);
  
  const oneHourInMilliseconds = 1 * 60 * 60 * 1000;
  const fiftyMinutesInMilliseconds = 50 * 60 * 1000;
  const totalMillisecondsToAdd = oneHourInMilliseconds + fiftyMinutesInMilliseconds;

  console.log('validando sesion')
  if (Date.now() < createTime + totalMillisecondsToAdd) {
    return token;
  } else {
    return undefined;
    // const { ok, data } = await validateTokenAction();

    // if (ok && data) {
    //   await createSession(data.token);
    //   return data.token;
    // } else {
    //   return undefined;
    // }
  }  
}

export async function createSession(token: string) {
  const expireAt = new Date(Date.now() + 7200 * 1000); // 2h
  const createTimeCookie = Date.now();
  const _cookies = cookies();

  const dataCookie = {
    token,
    createTime: createTimeCookie
  }

  _cookies.set(COOKIE_NAME, JSON.stringify(dataCookie), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expireAt,
    path: "/"
  });
}

export async function removeSession() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}
