"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            setUser(token);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("jwt", token);
        setUser(token);
        router.push("/dashboard");
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
