"use client";

import React, { useState } from "react";

import UserForm from "@/app/dashboard/usuarios/components/UserForm";
import { Modal } from "@/components/ui/table";
import { FaEraser, FaPencilRuler } from "react-icons/fa";
import { SimplifiedUser } from "@/interfaces";


interface TableControlsProps {
    item: SimplifiedUser;

}

const TableControls = ({ item }: TableControlsProps) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    return (
        <>
            <div className="flex gap-4">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setIsOpenEdit(true)}
                >
                    <FaPencilRuler width={25} />
                </button>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setIsOpenDelete(true)}
                >
                    <FaEraser width={25} />
                </button>
            </div>

            <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
                <UserForm
                    initialData={item}
                    onClose={() => setIsOpenEdit(false)}
                />
            </Modal>

            <Modal isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
                <div className="max-w-md mx-auto text-center">
                    <p className="text-lg mb-6">
                        ¿Estás seguro de eliminar al usuario{" "}
                        <strong className="font-semibold">{item.name}</strong>?
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Sí, eliminar
                        </button>
                        <button
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                            onClick={() => setIsOpenDelete(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default TableControls;