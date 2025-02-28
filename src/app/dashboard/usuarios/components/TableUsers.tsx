"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "./UserForm";
import { deleteUser, updateUser, createUser } from "@/actions/users";
import { SimplifiedUser, Roles } from "@/interfaces";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface UsersPageProps {
    users: SimplifiedUser[];
}

interface UserFormValues {
    name: string;
    email: string;
    phone: string;
    roles: Roles[];
}

export default function UserTable({ users }: UsersPageProps) {
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<SimplifiedUser> | null>(null);


    const handleEdit = (user: SimplifiedUser) => {
        setCurrentUser(user);
        setIsEditOpen(true);
    };


    const handleUpdate = async (data: UserFormValues) => {
        if (!currentUser || !currentUser.id) return;
        await updateUser(currentUser.id, {
            ...data,
            roles: data.roles,
        });
        setIsEditOpen(false);
        router.refresh();
    };


    const handleDelete = async (id: string) => {
        await deleteUser(id);
        router.refresh();
    };

    const handleCreate = async (data: UserFormValues) => {
        await createUser({
            ...data,
            roles: data.roles,
        });
        setIsCreateOpen(false);
        router.refresh();
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lista de Usuarios</h1>
                <Button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2">
                    <FaPlus /> Crear Usuario
                </Button>
            </div>
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">Nombre</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">Correo</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">Teléfono</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-semibold">Rol</th>
                        <th className="py-3 px-4 text-center text-gray-700 font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-4 text-center text-gray-500">
                                No hay usuarios disponibles.
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-gray-700">{user.name}</td>
                                <td className="py-3 px-4 text-gray-700">{user.email}</td>
                                <td className="py-3 px-4 text-gray-700">{user.phone}</td>
                                <td className="py-3 px-4 text-gray-700">{user.roles.join(", ")}</td>
                                <td className="py-3 px-4 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-blue-500 hover:text-blue-700 transition-colors"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete('' + user.id)}
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

            {isEditOpen && currentUser && (
                <UserForm
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    onSubmit={handleUpdate}
                    initialData={{
                        name: currentUser.name || "",
                        email: currentUser.email || "",
                        phone: currentUser.phone || "",
                        roles: currentUser.roles || [Roles.CLIENT],
                    }}
                    title="Editar Usuario"
                    submitText="Guardar"
                />
            )}

            {isCreateOpen && (
                <UserForm
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    onSubmit={handleCreate}
                    initialData={{ name: "", email: "", phone: "", roles: [Roles.CLIENT] }}
                    title="Crear Nuevo Usuario"
                    submitText="Crear"
                />
            )}
        </div>
    );
}