"use server";

import { getToken } from "@/utils";

import { ICustomer, Result } from "@/interfaces";

const URL = process.env.URL_BASE;

export async function getCustomers(
  limit = 10,
  offset = 0
): Promise<Result<ICustomer[]>> {
  try {
    const { token, error } = await getToken();
    
    if (!token && error) {
      throw new Error(error);
    }
    
    const response = await fetch(
      `${URL}/customers?limit=${limit}&offset=${offset}`,
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

    const customersArray = data?.customers || [];

    return { ok: true, data: customersArray, error: null };
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    return { ok: false, data: null, error: "Error al obtener los clientes" };
  }
}
