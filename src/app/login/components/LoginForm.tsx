"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/app/actions/auth";
import { useState } from "react";


import Image from "next/image";

const loginSchema = z.object({
    email: z.string().email("Por favor, ingresa un correo válido."),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            setLoading(true);
            setServerError(null);
            const result = await loginUser(data);
            console.log("Respuesta del servidor:", result);

            if (result.token && typeof window !== "undefined") {
                localStorage.setItem("jwt", result.token);
                console.log("JWT guardado:", result.token);
            }

            reset();
        } catch (error) {
            setServerError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <h2 className="mb-3 text-4xl font-bold">Bienvenido de nuevo</h2>
                    <p className="font-light text-gray-400 mb-8">Ingresa tus Datos</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-md">Email</label>
                            <Input {...register("email")} type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-md" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-md">Contraseña</label>
                            <Input {...register("password")} type="password" placeholder="******" className="w-full p-2 border border-gray-300 rounded-md" />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        {serverError && <p className="text-red-500 text-xs mt-2 text-center">{serverError}</p>}
                        <Button type="submit" disabled={loading} className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border-gray-300">
                            {loading ? "Cargando..." : "Iniciar sesión"}
                        </Button>
                    </form>
                </div>
                <div className="relative hidden md:block">
                    <Image src="/barberia.jpg"
                        width={400}
                        height={400}
                        alt="Login"
                        className="w-full h-full border rounded-md object-cover" />
                </div>
            </div>
        </div>
    );
}
