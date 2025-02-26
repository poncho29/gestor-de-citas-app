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

export async function getServiceById(id: string): Promise<SimplifiedService> {
  try {
    if (!URL)
      throw new Error("La variable de entorno URL_BASE no está definida.");

    console.log(`Obteniendo servicio con ID: ${id}`);

    const cookieValue = cookies().get(COOKIE_NAME)?.value;
    if (!cookieValue)
      throw new Error("No se encontró la cookie de autenticación");

    let token;
    try {
      const parsedCookie = JSON.parse(cookieValue);
      token = parsedCookie.token;
    } catch (error) {
      console.error("Error al parsear la cookie:", error);
      throw new Error("El formato de la cookie no es válido");
    }

    if (!token)
      throw new Error("No se encontró el token de autenticación en la cookie");

    const response = await fetch(`${URL}/services/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error en la API: ${response.status} - ${errorMessage}`);
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = (await response.json()) as ServiceResponse;
    console.log("Servicio recibido del backend:", data);

    return mapService(data);
  } catch (error) {
    console.error("Error al obtener el servicio:", error);
    throw error;
  }
}
