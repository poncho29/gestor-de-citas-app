"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AuthContext } from "./AuthContext";

import { loginAction } from "@/actions/auth/login-action";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            setUser(token);
        }
    }, []);

    const login = async ({ email, password }: { email: string; password: string }) => {
        const response = await loginAction({ email, password });

        if (response && response.success) {
            localStorage.setItem("jwt", response.user.token);
            setUser(response.user.id);
            router.push("/dashboard");
        } else {
            throw new Error(response.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
