"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { AuthContext } from "./AuthContext";

import { validateTokenAction } from "@/actions";

import { removeSession } from "@/utils/auth";

import { User } from "@/interfaces";

import { isSessionValid } from '@/utils';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    useEffect(() => {
        if (!pathname.startsWith("/dashboard")) return;

        if (!user && !isLoading && !isLogout) {
            const validateSession = async () => {
                setIsLoading(true);
                const { ok, data } = await validateTokenAction();
        
                if (ok && data) {
                    setUser(data);
                    setIsLoading(false);
                } else {
                    await logoutCtx();
                    setIsLoading(false);
                }
            };

            validateSession();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (!pathname.startsWith("/dashboard")) return;

        const checkSession = async () => {
            const token = await isSessionValid();

            if (!token ) await logoutCtx();
        };

        checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const loginCtx = (user: User | null) => {
        setIsLogout(true);
        setUser(user);
        router.push("/dashboard/citas");
        setIsLogout(false);
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
