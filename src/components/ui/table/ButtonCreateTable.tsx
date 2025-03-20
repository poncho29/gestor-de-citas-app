'use client'
import { useState } from "react";
import { Button } from "../button";

import { Modal } from "./Modal";

interface Props {
    text: string;
    form: React.ReactNode
}

export const ButtonCreateTable = ({ text, form }: Props) => {
    const [isOpen, setIOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setIOpen(!isOpen)}>{text}</Button>

            <Modal isOpen={isOpen} onClose={() => setIOpen(false)}>
                {form}
            </Modal>
        </div>
    )
}
