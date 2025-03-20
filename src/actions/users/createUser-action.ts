"use server";

import { AxiosInstance } from "@/utils";

import { Result, TCreateUser } from "@/interfaces";

export async function createUser(userData: TCreateUser): Promise<Result<TCreateUser>> {
  try {
    const response = await AxiosInstance.post<TCreateUser>("/users", userData);

    if (!response.data) throw new Error("Error al crear el usuario");

    return { ok: true, data: response.data, error: null };
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Error al crear el usuario";
    return { ok: false, data: null, error: errorMessage };
  }

  // try {
  //   if (!URL) {
  //     throw new Error("La variable de entorno URL_BASE no está definida.");
  //   }

  //   console.log("Creando un nuevo usuario...");

  //   const cookieValue = cookies().get(COOKIE_NAME)?.value;
  //   if (!cookieValue) {
  //     throw new Error("No se encontró la cookie de autenticación");
  //   }

  //   let token: string;
  //   try {
  //     token = JSON.parse(cookieValue).token;
  //   } catch (error) {
  //     console.error("Error al parsear la cookie:", error);
  //     throw new Error("El formato de la cookie no es válido");
  //   }

  //   if (!token) {
  //     throw new Error("No se encontró el token de autenticación en la cookie");
  //   }

  //   const response = await fetch(`${URL}/users`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(userData),
  //   });

  //   if (!response.ok) {
  //     const errorMessage = await response.text();
  //     console.error(`Error en la API: ${response.status} - ${errorMessage}`);
  //     throw new Error(`Error ${response.status}: ${errorMessage}`);
  //   }

  //   const data: SimplifiedUser = await response.json();
  //   console.log("Usuario creado exitosamente:", data);

  //   return data;
  // } catch (error) {
  //   console.error("Error al crear el usuario:", error);
  //   throw error;
  // }
}
