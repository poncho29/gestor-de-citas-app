"use server";

import { Result, SimplifiedUser } from "@/interfaces";
import { getToken } from "@/utils";

const URL = process.env.URL_BASE;

export async function updateUser(
  id: string,
  values: Partial<SimplifiedUser>
): Promise<Result<SimplifiedUser>> {
  try {
    const { token, error } = await getToken();
    if (!token && error) {
      throw new Error("No se encontró el token de autenticación en la cookie");
    }

    const response = await fetch(`${URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error en la API: ${response.status} - ${errorMessage}`);
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data: SimplifiedUser = await response.json();
    console.log("Usuario actualizado exitosamente:", data);

    return { ok: true, data, error: null };
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al actualizar el usuario";
    return { ok: false, data: null, error: errorMessage };
  }
}
