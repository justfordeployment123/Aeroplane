import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

/**
 * Wraps admin-only routes.
 * Redirects unauthenticated users to /admin/login, preserving the intended destination.
 */
export default function ProtectedAdminRoute() {
    const { isAuthenticated, loading } = useAdminAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-aero-dark flex items-center justify-center">
                <span className="text-sky-400 font-mono text-sm tracking-widest animate-pulse">VERIFYING SESSION…</span>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" state={{ from: location }} replace />;
}
