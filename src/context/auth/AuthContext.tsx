"use client";

import { createContext } from "react";

export interface AuthContextType {
    user: string | null;
    login: ({ email, password }: { email: string; password: string }) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
