"use client";

import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    login: async ({email, password}) => {
        return {
            success: true,
            redirectTo: "/dashboard"
        }
    },
    logout: async () => {
        return {
            success: true
        }
    },
    check: async () => {
        return {
            authenticated: true,
            redirectTo: "/auth/signin"
        }
    },
    onError: async () => {
        return {}
    },
    getIdentity: async () => {
        return {
            firstname: "Nazar",
            lastname: "Khoros"
        }
    }
}