"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import ServiceForm from "./ServiceForm";


import { deleteService, updateService, createService } from "@/actions/services";

import { SimplifiedService } from "@/interfaces/services.interfaces";

import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface ServicesPageProps {
    services: SimplifiedService[];
}

interface ServiceFormValues {
    name: string;
    description?: string;
    duration: number;
    price: number;
}

export default function ServiceTable({ services }: ServicesPageProps) {
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [currentService, setCurrentService] = useState<Partial<SimplifiedService> | null>(null);

    const handleEdit = (service: SimplifiedService) => {
        setCurrentService(service);
        setIsEditOpen(true);
    };

    const handleUpdate = async (data: ServiceFormValues) => {
        if (!currentService || !currentService.id) return;

        await updateService(currentService.id, {
            ...data,
            duration: Number(data.duration),
            price: Number(data.price),
        });

        setIsEditOpen(false);
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        await deleteService(id);
        router.refresh();
    };
    const handleCreate = async (data: ServiceFormValues) => {
        await createService({
            ...data,
            description: data.description ?? "",
            duration: Number(data.duration),
            price: Number(data.price),
        });

        setIsCreateOpen(false);
        router.refresh();
    };


    return (
        <div className="container mx-auto p-4 capitalize">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lista de Servicios</h1>
                <Button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2">
                    <FaPlus /> Crear Servicio
                </Button>
            </div>

            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">Nombre</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">Descripción</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">Duración</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">Precio</th>
                        <th className="py-3 px-4 text-center text-gray-700 font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-4 text-center text-gray-500">
                                No hay servicios disponibles.
                            </td>
                        </tr>
                    ) : (
                        services.map((service) => (
                            <tr key={service.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-gray-700">{service.name}</td>
                                <td className="py-3 px-4 text-gray-700">{service.description}</td>
                                <td className="py-3 px-4 text-gray-700">{service.duration} min</td>
                                <td className="py-3 px-4 text-gray-700">${service.price}</td>
                                <td className="py-3 px-4 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="text-blue-500 hover:text-blue-700 transition-colors"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {isEditOpen && (
                <ServiceForm
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    onSubmit={handleUpdate}
                    initialData={currentService ?? {}}
                    title="Editar Servicio"
                    submitText="Guardar"
                />
            )}
            {isCreateOpen && (
                <ServiceForm
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    onSubmit={handleCreate}
                    initialData={{ name: "", description: "", duration: 0, price: 0 }}
                    title="Crear Nuevo Servicio"
                    submitText="Crear"
                />
            )}
        </div>
    );
}
