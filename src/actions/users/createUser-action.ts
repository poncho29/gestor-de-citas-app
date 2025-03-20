"use server";

import { Result, SimplifiedUser } from "@/interfaces";
import { getToken } from "@/utils";

const URL = process.env.URL_BASE;

export async function createUser(
  userData: Omit<SimplifiedUser, "id">
): Promise<Result<SimplifiedUser>> {
  try {
    const { token, error } = await getToken();

    if (!token && error) {
      throw new Error(error);
    }

    const response = await fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error en la API: ${response.status} - ${errorMessage}`);
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data: SimplifiedUser = await response.json();
    console.log("Usuario creado exitosamente:", data);

    return { ok: true, data, error: null };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return { ok: false, data: null, error: (error as Error).message };
  }
}
