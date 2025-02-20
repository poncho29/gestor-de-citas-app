"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AuthContext } from "./AuthContext";

import { validateSessionAction } from "@/actions";

import { removeSession } from "@/utils/auth";

import { User } from "@/interfaces";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) return; 

        console.log('Validating session...');
        const validateSession = async () => {
            try {
                const { success, user } = await validateSessionAction();
                
                if (success && user) {
                    setUser(user);
                } else {
                    logoutCtx();
                }
            } catch (error) {
                console.error('Error validating session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        validateSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loginCtx = (user: User | null) => {
        setUser(user);
        router.push("/citas");
    }

    // const login = async ({ email, password }: { email: string; password: string }) => {
    //     const response = await loginAction({ email, password });

    //     if (response && response.success) {
    //         localStorage.setItem("jwt", response.user.token);
    //         setUser(response.user.id);
    //         router.push("/dashboard");
    //     } else {
    //         throw new Error(response.message);
    //     }
    // };

    const logoutCtx = () => {
        removeSession();
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
