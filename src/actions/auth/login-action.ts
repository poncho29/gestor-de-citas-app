'use server';

import { createSession, isSessionValid } from "@/utils";

import { User, Result } from "@/interfaces";

const URL = process.env.URL_BASE;

export async function loginAction(
  credentials: { email: string; password: string },
) {
  try {
    const response = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      console.log('Error al iniciar sesión', response);
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid credentials.');
    }

    const user: User = await response.json();
    createSession(user.token);

    return { success: true, user, message: 'Inicio de sesión exitoso' };
  } catch (error) {
    console.log('login action error |', error);
    let errorMessage = 'Error al iniciar sesión';

    if (error instanceof Error) {
      errorMessage = error.message;
      if (errorMessage === 'Not authorized') {
        errorMessage = 'No tienes permiso';
      } else if (errorMessage === 'Credentials are not valid') {
        errorMessage = 'Las credenciales no son validas';
      }
    }
    
    return { success: false, user: null, message: errorMessage };
  }
}

export async function validateTokenAction(): Promise<Result<User>> {
  try {
    const token = await isSessionValid();

    if (!token) {
      throw new Error("No hay un token válido");
    }

    // Si existe un token válido, realiza una solicitud para validar la sesión
    const response = await fetch(`${URL}/auth/validate-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Error al validar la sesión");
    }

    const user: User = await response.json();
    createSession(user.token);

    return { ok: true, data: user, error: null };
  } catch (error) {
    console.log('validate token action error |', error);
    const errorMessage = "Error al validar la sesión";

    return { ok: false, data: null, error: errorMessage };
  }
}
