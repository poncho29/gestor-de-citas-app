'use server'

import { getToken } from "@/utils"

import { AppoinmentResponse, Result } from "@/interfaces"

const URL = process.env.URL_BASE

export const getAppointments = async (): Promise<Result<AppoinmentResponse>> => {
  try {
    const { token, error } = await getToken()
  
    if (!token && error) 
      throw new Error(error)

    const response = await fetch(`${URL}/appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();

    return { ok: true, data, error: null };
  } catch (error) {
    console.log("Error al obtener las citas:", error);
    const errorMessage = error instanceof Error ? error.message : "Error al obtener los citas";

    return { ok: false, data: null, error: errorMessage };
  }
}