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

export async function getServices(
  limit: number = 10,
  offset: number = 0
): Promise<{ services: SimplifiedService[]; total: number }> {
  try {
    const cookieStore = cookies();
    const cookieValue = cookieStore.get(COOKIE_NAME)?.value;

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
      `${URL}/services?limit=${limit}&offset=${offset}`,
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
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();

    const services = Array.isArray(data.services)
      ? data.services.map(mapService)
      : [];
    const total = typeof data.total === "number" ? data.total : 0;

    return { services, total };
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    throw error;
  }
}
