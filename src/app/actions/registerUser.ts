import {
  handleTokenMiddleware,
  redirectToDashboardMiddleware,
  handleErrorMiddleware,
} from "./middleware";

export async function registerUser(credentials: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  try {
    const response = await fetch("/api/register", {
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
