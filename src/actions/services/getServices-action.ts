import {
  ServiceResponse,
  SimplifiedService,
} from "@/interfaces/services.interfaces";

const URL = process.env.URL_BASE;

function mapService(response: ServiceResponse): SimplifiedService {
  return {
    name: response.name,
    description: response.description,
    duration: response.duration,
    price: response.price,
  };
}

export async function getServices(): Promise<SimplifiedService[]> {
  try {
    const response = await fetch(`${URL}/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }

    const data: ServiceResponse[] = await response.json();
    return data.map(mapService);
  } catch (error) {
    console.error("Error en getServices:", error);
    throw new Error("No se pudieron obtener los servicios");
  }
}

export async function getServiceById(id: string): Promise<SimplifiedService> {
  try {
    const response = await fetch(`${URL}/services/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener el servicio");
    }

    const data: ServiceResponse = await response.json();
    return mapService(data);
  } catch (error) {
    console.error("Error en getServiceById:", error);
    throw new Error("No se pudo obtener el servicio");
  }
}

export async function updateService(
  id: string,
  updatedData: Partial<SimplifiedService>
): Promise<SimplifiedService> {
  try {
    const response = await fetch(`${URL}/services/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el servicio");
    }

    const data: ServiceResponse = await response.json();
    return mapService(data);
  } catch (error) {
    console.error("Error en updateService:", error);
    throw new Error("No se pudo actualizar el servicio");
  }
}

export async function deleteService(id: string): Promise<void> {
  try {
    const response = await fetch(`${URL}/services/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el servicio");
    }
  } catch (error) {
    console.error("Error en deleteService:", error);
    throw new Error("No se pudo eliminar el servicio");
  }
}
