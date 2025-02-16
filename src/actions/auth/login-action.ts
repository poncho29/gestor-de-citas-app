'use server';

const URL = process.env.URL_BASE;

export async function loginAction(
  credentials: { email: string; password: string },
) {
  try {
    console.log('URL:', `${URL}/auth/login`);
    const response = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      console.log('Error al iniciar sesión 111:', response);
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid credentials.');
    }

    const user = await response.json();

    return { success: true, user };
  } catch (error) {
    let errorMessage = 'Error al iniciar sesión';

    if (error instanceof Error) {
      errorMessage = error.message;
      if (errorMessage === 'Not authorized') {
        errorMessage = 'No tienes permiso';
      } else if (errorMessage === 'Credentials are not valid') {
        errorMessage = 'Credenciales no validas';
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return { success: false, message: errorMessage };
  }
}
