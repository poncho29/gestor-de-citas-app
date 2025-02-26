"use server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/utils/api";
import { SimplifiedUser } from "@/interfaces";

const URL = process.env.URL_BASE;

export async function getUsers(
  limit = 10,
  offset = 0
): Promise<SimplifiedUser[]> {
  try {
    console.log("Obteniendo lista de usuarios...");

    if (!URL)
      throw new Error("La variable de entorno URL_BASE no está definida.");

    const cookieValue = cookies().get(COOKIE_NAME)?.value;
    if (!cookieValue)
      throw new Error("No se encontró la cookie de autenticación");

    let token;
    try {
      const parsedCookie = JSON.parse(cookieValue || "{}");
      token = parsedCookie.token;
    } catch (error) {
      console.error("Error al parsear la cookie:", error);
      throw new Error("El formato de la cookie no es válido");
    }

    if (!token)
      throw new Error("No se encontró el token de autenticación en la cookie");

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

    return data as SimplifiedUser[];
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
}
