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
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormInputs) => {
        if (loading) return;
        try {
            setLoading(true);
            const result = await loginUser(data);
            console.log("Respuesta del servidor:", result);
            reset();
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <h2 className="mb-4 text-4xl font-bold">Bienvenido a la plataforma</h2>
                    <p className="font-light text-gray-400 mb-8">Ingresa tus Datos</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            disabled={loading || isSubmitting}
                            className="w-full bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border-gray-300"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Cargando...
                                </div>
                            ) : (
                                "Iniciar sesión"
                            )}
                        </Button>
                    </form>
                </div>
                <div className="relative hidden md:block">
                    <Image
                        src="/barberia.jpg"
                        width={400}
                        height={400}
                        alt="Login"
                        className="w-full h-full border rounded-r-md object-cover"
                    />
                </div>
            </div>
        </div>
    );
}