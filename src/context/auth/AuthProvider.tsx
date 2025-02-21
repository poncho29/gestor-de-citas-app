"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AuthContext } from "./AuthContext";

import { validateTokenAction } from "@/actions";

import { removeSession } from "@/utils/auth";

import { User } from "@/interfaces";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    // const pathname = usePathname();
    
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user && !isLoading) {
            const validateSession = async () => {
                console.log('Obtener usuario de nuevo revalidando token');
                setIsLoading(true);
                const { ok, data, error } = await validateTokenAction();
        
                if (ok && data) {
                    setUser(data);
                    setIsLoading(false);
                } else {
                    console.error("Error validating session:", error);
                    await logoutCtx();
                    setIsLoading(false);
                }
            };

            validateSession();
        }
    }, [user]);

    const loginCtx = (user: User | null) => {
        setUser(user);
        router.push("/dashboard/citas");
    }

    const logoutCtx = async () => {
        await removeSession();
        setUser(null);
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isloadingCtx: isLoading,
                loginCtx,
                logoutCtx
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
