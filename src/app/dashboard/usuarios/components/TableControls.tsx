"use client";

import React, { useState } from "react";

// import { updateUser } from "@/actions/users";

import UserForm from "@/app/dashboard/usuarios/components/UserForm";
import { Modal } from "@/components/ui/table";

import { FaEraser, FaPencilRuler } from "react-icons/fa";

import { SimplifiedUser } from "@/interfaces";
interface TableControlsProps {
    item: Partial<SimplifiedUser>;
}

const TableControls = ({ item }: TableControlsProps) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    return (
        <>
            <div className="flex gap-2">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setIsOpenEdit(true)}
                >
                    <FaPencilRuler />
                </button>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setIsOpenDelete(true)}
                >
                    <FaEraser />
                </button>
            </div>

            <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)} >
                {<UserForm
                    initialData={item}
                    onClose={() => setIsOpenEdit(false)}
                />}
            </Modal>

            <Modal isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)} >
                <div>
                    <p>¿Estás seguro de eliminar el usuario {item.name}?</p>
                    <button onClick={() => setIsOpenDelete(false)}>Sí</button>
                    <button onClick={() => setIsOpenDelete(false)}>No</button>
                </div>
            </Modal>
        </>


    );
};

export default TableControls;