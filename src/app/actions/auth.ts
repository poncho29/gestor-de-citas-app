export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error en el servidor");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Error de conexión. Revisa tu internet.");
    }
    throw new Error(
      error instanceof Error ? error.message : "Ocurrió un error inesperado."
    );
  }
}
