import {
  handleTokenMiddleware,
  redirectToDashboardMiddleware,
  handleErrorMiddleware,
} from "./middleware";

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

    const result = await response.json();

    if (result.token) {
      handleTokenMiddleware(result.token);
      redirectToDashboardMiddleware();
    }

    return result;
  } catch (error) {
    handleErrorMiddleware(error);
    throw error;
  }
}
