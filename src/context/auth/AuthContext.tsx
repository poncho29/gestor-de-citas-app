"use client";

import { createContext } from "react";

import { User } from "@/interfaces";

export interface AuthContextType {
    user: User | null;
    isloadingCtx: boolean;
    loginCtx: (user: User | null) => void;
    logoutCtx: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
