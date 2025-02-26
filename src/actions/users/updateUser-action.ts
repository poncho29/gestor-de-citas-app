"use server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/utils/api";
import { SimplifiedUser } from "@/interfaces";

const URL = process.env.URL_BASE;

export async function updateUser(
  id: string,
  updates: Partial<SimplifiedUser>
): Promise<SimplifiedUser> {
  try {
    if (!URL)
      throw new Error("La variable de entorno URL_BASE no está definida.");

    console.log(`Actualizando usuario con ID: ${id}...`);

    const cookieValue = cookies().get(COOKIE_NAME)?.value;
    if (!cookieValue)
      throw new Error("No se encontró la cookie de autenticación");

    let token: string;
    try {
      token = JSON.parse(cookieValue).token;
    } catch (error) {
      console.error("Error al parsear la cookie:", error);
      throw new Error("El formato de la cookie no es válido");
    }

    if (!token)
      throw new Error("No se encontró el token de autenticación en la cookie");

    const response = await fetch(`${URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error en la API: ${response.status} - ${errorMessage}`);
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data: SimplifiedUser = await response.json();
    console.log("Usuario actualizado exitosamente:", data);

    return data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
}
