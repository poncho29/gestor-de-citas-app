"use server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/utils/api";
import { SimplifiedUser, Roles } from "@/interfaces";

const URL = process.env.URL_BASE;

// Función para validar los datos de actualización
function validateUpdates(
  updates: Partial<SimplifiedUser>
): Partial<SimplifiedUser> {
  const allowedFields: Array<keyof SimplifiedUser> = [
    "name",
    "email",
    "phone",
    "roles",
  ];
  const validUpdates: Partial<SimplifiedUser> = {};

  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      if (key === "roles") {
        if (!Array.isArray(updates.roles)) {
          throw new Error("La propiedad 'roles' debe ser un arreglo válido");
        }
        validUpdates.roles = updates.roles as Roles[];
      } else {
        validUpdates[key] = updates[key];
      }
    }
  }

  return validUpdates;
}

export async function updateUser(
  id: string,
  updates: Partial<SimplifiedUser>
): Promise<SimplifiedUser> {
  try {
    if (!URL) {
      throw new Error("La variable de entorno URL_BASE no está definida.");
    }

    console.log(`Actualizando usuario con ID: ${id}...`);

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

    const validUpdates = validateUpdates(updates);

    const response = await fetch(`${URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validUpdates),
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
