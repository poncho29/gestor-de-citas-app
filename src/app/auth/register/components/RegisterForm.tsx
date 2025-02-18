"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    phone: z.string()
        .min(10, "El teléfono debe tener al menos 10 dígitos.")
        .max(15, "El teléfono no debe superar los 15 dígitos.")
        .regex(/^\d+$/, "Solo se permiten números."),
    email: z.string().email("Por favor, ingresa un correo válido."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            console.log("Datos de registro:", data);
            router.push("/auth/login");
        } catch (error) {
            console.error("Error durante el registro:", error);
            const errorMessage = error instanceof Error ? error.message : "Error al registrarse";
            setError(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <h2 className="mb-4 text-4xl font-bold">Regístrate en Barberia Shop</h2>
                    <p className="font-light text-gray-400 mb-8">Crea una cuenta</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-md">Nombre</label>
                            <Input
                                {...register("name")}
                                type="text"
                                placeholder="Tu nombre"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-md">Teléfono</label>
                            <Input
                                {...register("phone")}
                                type="text"
                                placeholder="Tu número de teléfono"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label className="block text-md">Email</label>
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-md">Contraseña</label>
                            <Input
                                {...register("password")}
                                type="password"
                                placeholder="******"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border-gray-300"
                        >
                            {isSubmitting ? "Registrando..." : "Registrarse"}
                        </Button>
                        {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-500 text-sm">¿Ya tienes una cuenta?</p>
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => router.push("/auth/login")}
                        >
                            Iniciar sesión
                        </Button>
                    </div>
                </div>
                <div className="relative hidden md:block">
                    <Image
                        src="/barberia.jpg"
                        width={400}
                        height={400}
                        alt="Register"
                        className="w-full h-full border rounded-r-md object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
