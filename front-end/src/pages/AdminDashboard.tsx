import { useAdminAuth } from "../hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const { admin, logout } = useAdminAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-aero-dark text-white flex flex-col items-center justify-center gap-6 font-mono">
            <div className="border border-sky-500/20 rounded px-10 py-8 bg-white/[0.03] text-center space-y-3">
                <p className="text-[10px] tracking-widest text-sky-400/70 uppercase">Admin Dashboard</p>
                <h1 className="text-2xl font-bold">Welcome, {admin?.username}</h1>
                <p className="text-white/40 text-sm">
                    {admin?.email} · {admin?.role}
                </p>
                <button
                    onClick={handleLogout}
                    className="mt-4 px-6 py-2 text-xs tracking-widest uppercase border border-red-500/30 text-red-400 rounded
                     hover:bg-red-500/10 transition-colors duration-150"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
