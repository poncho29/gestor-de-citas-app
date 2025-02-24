"use server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/utils/api";
import {
  ServiceResponse,
  SimplifiedService,
} from "@/interfaces/services.interfaces";

const URL = process.env.URL_BASE;

function mapService(response: ServiceResponse): SimplifiedService {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    duration: response.duration,
    price: response.price,
  };
}

export async function updateService(
  id: string,
  updateData: Partial<Omit<SimplifiedService, "id">>
): Promise<SimplifiedService> {
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

    const { id: _, duration, price, ...validData } = updateData;

    if (duration !== undefined && (duration < 15 || duration > 1440)) {
      throw new Error("La duración debe estar entre 15 y 1440 minutos");
    }

    if (price !== undefined && price < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    const response = await fetch(`${URL}/services/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...validData, duration, price }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Servicio actualizado:", data);

    return mapService(data);
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    throw error;
  }
}
