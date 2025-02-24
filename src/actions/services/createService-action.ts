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

export async function createService(
  newService: Omit<SimplifiedService, "id">
): Promise<SimplifiedService> {
  try {
    console.log("Iniciando creación de servicio...");

    console.log("URL de la API:", URL);
    if (!URL)
      throw new Error("La variable de entorno URL_BASE no está definida.");

    const cookieValue = cookies().get(COOKIE_NAME)?.value;
    console.log("Valor de la cookie:", cookieValue);

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

    if (typeof newService.price !== "number" || newService.price < 0) {
      throw new Error("El precio debe ser un número mayor o igual a 0");
    }

    console.log("Datos enviados al backend:", newService);

    const response = await fetch(`${URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newService),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error en la API: ${response.status} - ${errorMessage}`);
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Servicio creado exitosamente:", data);

    return mapService(data);
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    throw error;
  }
}
