"use server";

import { ResponseUser, Result } from "@/interfaces";

import { getToken } from "@/utils";

const URL = process.env.URL_BASE;

export async function getUsers(
  limit = 10,
  offset = 0
): Promise<Result<ResponseUser>> {
  try {
    const { token, error } = await getToken();

    if (!token && error) {
      throw new Error(error);
    }

    const response = await fetch(
      `${URL}/users?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error en la API: ${response.status} - ${errorMessage}`);
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
    const data = await response.json();
    console.log("Usuarios obtenidos exitosamente:", data);

    return { ok: true, data, error: null };
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener los usuarios";
    return { ok: false, data: null, error: errorMessage };
  }
}
