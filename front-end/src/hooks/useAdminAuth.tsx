import { useState, useEffect, createContext, useContext, useCallback } from "react";

const API = import.meta.env.VITE_API_URL;

interface Admin {
    _id: string;
    username: string;
    email: string;
    role: "admin" | "superadmin";
    lastLogin: string | null;
}

interface AuthState {
    admin: Admin | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<AuthState>({
        admin: null,
        token: localStorage.getItem("adminToken"),
        loading: true,
        error: null,
    });

    // On mount, verify stored token
    useEffect(() => {
        const verify = async () => {
            const stored = localStorage.getItem("adminToken");
            if (!stored) {
                setState((s) => ({ ...s, loading: false }));
                return;
            }
            try {
                const res = await fetch(`${API}/admin/me`, {
                    headers: { Authorization: `Bearer ${stored}` },
                    credentials: "include",
                });
                const data = await res.json();
                if (data.success) {
                    setState({ admin: data.admin, token: stored, loading: false, error: null });
                } else {
                    localStorage.removeItem("adminToken");
                    setState({ admin: null, token: null, loading: false, error: null });
                }
            } catch {
                setState({ admin: null, token: null, loading: false, error: null });
            }
        };
        verify();
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setState((s) => ({ ...s, loading: true, error: null }));
        try {
            const res = await fetch(`${API}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            localStorage.setItem("adminToken", data.token);
            setState({ admin: data.admin, token: data.token, loading: false, error: null });
        } catch (err: any) {
            setState((s) => ({ ...s, loading: false, error: err.message }));
            throw err;
        }
    }, []);

    const logout = useCallback(async () => {
        const stored = localStorage.getItem("adminToken");
        try {
            await fetch(`${API}/admin/logout`, {
                method: "POST",
                headers: { Authorization: `Bearer ${stored}` },
                credentials: "include",
            });
        } catch {}
        localStorage.removeItem("adminToken");
        setState({ admin: null, token: null, loading: false, error: null });
    }, []);

    const clearError = useCallback(() => {
        setState((s) => ({ ...s, error: null }));
    }, []);

    return (
        <AdminAuthContext.Provider value={{ ...state, login, logout, clearError, isAuthenticated: !!state.admin }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const ctx = useContext(AdminAuthContext);
    if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
    return ctx;
};
