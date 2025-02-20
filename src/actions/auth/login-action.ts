'use server';

import { COOKIE_NAME, createSession, isSessionValid } from "@/utils/auth";

import { Roles, User } from "@/interfaces";

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
    let errorMessage = typeof error === 'string' ? error : 'Error al iniciar sesión';

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

export async function validateSessionAction(): Promise<{ success: boolean; user: User | null }> {
  try {
    const token = isSessionValid(COOKIE_NAME);

    if (!token) {
      throw new Error("La sesión expiró");
    }

    // Si existe un token válido, realiza una solicitud para validar la sesión
    // TODO: crear endpoint de validación de sesión que regrese el usuario

    // if (!response.ok) {
    //   return { success: false, user: null };
    // }

    // const user = await response.json();
    const user: User = {
      id: '1',
      email: '5aGtD@example.com',
      roles: [Roles.SUPER_ADMIN],
      token
    }

    return { success: true, user };
  } catch (error) {
    console.error("Error al validar la sesión:", error);
    return { success: false, user: null };
  }
}
