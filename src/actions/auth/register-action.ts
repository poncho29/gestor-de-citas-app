"use server";

const URL = process.env.URL_BASE;

export async function registerAction(credentials: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  try {
    console.log("URL:", `${URL}/auth/register`);
    const response = await fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Error en el servidor");
    }

    const result = await response.json();

    return { success: true, user: result };
  } catch (error) {
    let errorMessage = "Error en el registro";

    if (error instanceof Error) {
      errorMessage = error.message;
      if (errorMessage === "Email already in use") {
        errorMessage = "El correo ya está en uso";
      }
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return { success: false, message: errorMessage };
  }
}
