"use server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/utils/api";
import { SimplifiedUser } from "@/interfaces";

const URL = process.env.URL_BASE;

export async function createUser(
  user: SimplifiedUser
): Promise<SimplifiedUser> {
  try {
    console.log("Creando nuevo usuario...");

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

    const response = await fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error en la API: ${response.status} - ${errorMessage}`);
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Usuario creado exitosamente:", data);

    return data as SimplifiedUser;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
}
