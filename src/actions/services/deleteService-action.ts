"use server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/utils/api";

const URL = process.env.URL_BASE;

export async function deleteService(id: string): Promise<void> {
  try {
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

    const response = await fetch(`${URL}/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    console.log(`Servicio con ID ${id} eliminado exitosamente.`);
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    throw error;
  }
}
