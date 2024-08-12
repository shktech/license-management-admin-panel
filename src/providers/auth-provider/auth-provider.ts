"use client";

import useStore from "@hooks/globalStore";
import { AuthProvider } from "@refinedev/core";
import { Organization, Permission, Role, User } from "@/types/types";

export interface LoginResponse {
    temp_access: string;
    user_id: string;
    organizations: Organization[];
}

export interface CustomAuthProvider extends AuthProvider {
    validateInviteToken: (token: string) => Promise<any>;
}

const aggregatePermissionsByCodename = (roles: Role[], codename: string): Permission | null => {
    console.log(roles, codename)
    const aggregatedPermission: Permission = {
        codename: codename,
        create: false,
        read: false,
        update: false,
        delete: false,
    };

    roles.forEach(role => {
        role.permissions?.forEach(permission => {
            if (permission.codename === codename) {
                aggregatedPermission.create = aggregatedPermission.create || !!permission.create;
                aggregatedPermission.read = aggregatedPermission.read || !!permission.read;
                aggregatedPermission.update = aggregatedPermission.update || !!permission.update;
                aggregatedPermission.delete = aggregatedPermission.delete || !!permission.delete;
            }
        });
    });

    return aggregatedPermission;
}

const getCurrentUser = async (): Promise<User | null> => {
    const user = useStore.getState().user;

    if (user) {
        return user;
    }

    return new Promise((resolve) => {
        const unsubscribe = useStore.subscribe((state) => {
            if (state.user) {
                resolve(state.user);
                unsubscribe();
            }
        });
    });
}

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const response = await fetch("https://license-management-server-lysrkspm1.vercel.app/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const data: LoginResponse = await response.json();
            localStorage.setItem("tempToken", data.temp_access);
            useStore.getState().setOrganizations(data.organizations);
            return {
                success: true,
                redirectTo: "/auth/organization"
            }
        } else {
            return Promise.reject(new Error("Invalid username or password"));
        }
        // return {
        //     success: true,
        //     redirectTo: "/dashboard"
        // }
    },
    register: async ({ token, username, password, first_name, last_name }) => {
        const response = await fetch("https://license-management-server-lysrkspm1.vercel.app/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ token, username, password, first_name, last_name })
        });
        if (response.ok) {
            return {
                success: true,
                redirectTo: "/auth/signin"
            }
        } else {
            return {
                success: false
            }
        }
    },
    logout: async () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tempToken");
        useStore.getState().setUser(null);
        return {
            success: true,
            redirectTo: "/auth/signin",
            successNotification: {
                message: "You have successfully logged out",
                description: "You will be redirected to the login page",
            },
        }
    },
    check: async () => {
        const response = await fetch("https://license-management-server-lysrkspm1.vercel.app/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            return {
                authenticated: true
            }
        } else {
            return {
                authenticated: false,
                redirectTo: "/auth/signin"
            }
        }
    },
    onError: async () => {
        return {}
    },
    getIdentity: async () => {
        const user: User | null = useStore.getState().user ?? null;
        if (!user) {
            const response = await fetch("https://license-management-server-lysrkspm1.vercel.app/user/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (response.ok) {
                const data: User = await response.json();
                useStore.getState().setUser(data)
                return data
            } else {
                return null;
            }
        } else {
            return user;
        }
    },
    getPermissions: async (params) => {
        const user: User | null = await getCurrentUser();
        return aggregatePermissionsByCodename(user?.roles || [], params?.codename)
    }
}
