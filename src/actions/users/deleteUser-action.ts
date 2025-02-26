"use server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/utils/api";

const URL = process.env.URL_BASE;

export async function deleteUser(id: string): Promise<{ message: string }> {
  try {
    if (!id || id.trim() === "") {
      throw new Error("El ID del usuario no puede estar vacío");
    }

    if (!URL) {
      throw new Error("La variable de entorno URL_BASE no está definida.");
    }

    console.log(`Eliminando usuario con ID: ${id}...`);

    const cookieValue = cookies().get(COOKIE_NAME)?.value;
    if (!cookieValue) {
      throw new Error("No se encontró la cookie de autenticación");
    }

    let token: string;
    try {
      token = JSON.parse(cookieValue).token;
    } catch (error) {
      console.error("Error al parsear la cookie:", error);
      throw new Error("El formato de la cookie no es válido");
    }

    if (!token) {
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
      throw new Error(
        `Error ${response.status}: ${
          errorMessage || "Ocurrió un error al eliminar el usuario"
        }`
      );
    }

    console.log("Usuario eliminado exitosamente");

    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
}
