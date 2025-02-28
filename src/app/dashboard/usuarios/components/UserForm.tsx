"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SimplifiedUser, Roles } from "@/interfaces";

const phoneRegex = /^[0-9]{10,}$/;

// Esquema de validación
const userSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Debe ser un correo válido"),
    phone: z.string().regex(phoneRegex, "Debe ser un número de teléfono válido"),
    roles: z.array(z.nativeEnum(Roles)).nonempty("Debe seleccionar al menos un rol"),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SimplifiedUser) => Promise<void>;
    initialData?: Partial<SimplifiedUser>;
    title: string;
    submitText: string;
}

export default function UserForm({ isOpen, onClose, onSubmit, initialData, title, submitText }: UserFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            roles: initialData?.roles || [Roles.CLIENT],
        },
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                roles: initialData.roles || [Roles.CLIENT],
            });
        } else {
            reset({
                name: "",
                email: "",
                phone: "",
                roles: [Roles.CLIENT],
            });
        }
    }, [initialData, reset]);


    const onSubmitHandler: SubmitHandler<UserFormValues> = async (data) => {
        setIsLoading(true);
        try {
            await onSubmit(data as SimplifiedUser);
            reset();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 text-gray-700">
                            Nombre
                        </label>
                        <Input id="name" {...register("name")} placeholder="Nombre" />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>


                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-700">
                            Correo electrónico
                        </label>
                        <Input id="email" {...register("email")} type="email" placeholder="Correo electrónico" />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>


                    <div>
                        <label htmlFor="phone" className="block mb-1 text-gray-700">
                            Teléfono
                        </label>
                        <Input id="phone" {...register("phone")} placeholder="Teléfono" />
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>


                    <div>
                        <label htmlFor="roles" className="block mb-1 text-gray-700">
                            Rol
                        </label>
                        <Select
                            onValueChange={(value) => setValue("roles", [value as Roles])}
                            defaultValue={initialData?.roles?.[0] || Roles.CLIENT}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(Roles).map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role.replace("_", " ").toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.roles && <p className="text-red-500">{errors.roles.message}</p>}
                    </div>

                    <DialogFooter className="mt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                onClose();
                                reset();
                            }}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Cargando..." : submitText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}