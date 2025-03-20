"use server";

import { AxiosInstance } from "@/utils";

import { IUserResponse, Result } from "@/interfaces";

export async function getUsers(limit = 10, offset = 0): Promise<Result<IUserResponse>> {
  try {
    const response = await AxiosInstance.get<IUserResponse>(
      `/users?limit=${limit}&offset=${offset}`
    );

    if (!response.data) throw new Error("Error al obtener los usuarios");

    return { ok: true, data: response.data, error: null };
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Error al obtener los usuarios";
    return { ok: false, data: null, error: errorMessage };
  }
}
