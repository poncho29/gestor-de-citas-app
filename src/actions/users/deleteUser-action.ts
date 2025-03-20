"use server";

import { Result } from "@/interfaces";
import { getToken } from "@/utils";

const URL = process.env.URL_BASE;

export async function deleteUser(id: string): Promise<Result<void>> {
  try {
    const { token, error } = await getToken();

    if (!token && error) {
      throw new Error("No se encontró el token de autenticación en la cookie");
    }

    const response = await fetch(`${URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error en la API: ${response.status} - ${errorMessage}`);
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    console.log("Usuario eliminado exitosamente");

    return { ok: true, data: undefined, error: null };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al eliminar el usuario";

    return { ok: false, data: null, error: errorMessage };
  }
}
