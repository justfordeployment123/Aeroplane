// pages/AdminDashboard.tsx
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useNavigate, Link } from "react-router-dom";
import { Package, LogOut, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
    const { admin, logout } = useAdminAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login", { replace: true });
    };

    const modules = [
        {
            icon: Package,
            label: "Products",
            description: "Add, edit, delete and reorder drone products. Control visibility on the public site.",
            href: "/admin/products",
            accent: "#38BDF8",
        },
        // Add more modules here as you build them
    ];

    return (
        <div className="min-h-screen bg-[#0a0a14] text-white font-mono">
            {/* Top bar */}
            <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <ShieldCheck size={14} className="text-sky-400" />
                    </div>
                    <span className="text-xs tracking-widest uppercase text-sky-400/70">Admin Console</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-white/30">{admin?.email}</span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-red-500/20 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={12} /> Sign out
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
                {/* Welcome */}
                <div>
                    <p className="text-[10px] tracking-widest uppercase text-sky-400/50 mb-2">Dashboard</p>
                    <h1 className="text-3xl font-black text-white">Welcome back, {admin?.username}</h1>
                    <p className="text-sm text-white/30 mt-1 capitalize">{admin?.role}</p>
                </div>

                {/* Module cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modules.map((m) => {
                        const Icon = m.icon;
                        return (
                            <Link
                                key={m.href}
                                to={m.href}
                                className="group relative block p-6 rounded-2xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                                style={{
                                    borderColor: `${m.accent}18`,
                                    background: `${m.accent}05`,
                                }}
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors"
                                    style={{ background: `${m.accent}15`, border: `1px solid ${m.accent}25` }}
                                >
                                    <Icon size={20} style={{ color: m.accent }} />
                                </div>
                                <h2 className="font-bold text-white text-base mb-1.5">{m.label}</h2>
                                <p className="text-xs text-white/30 leading-relaxed">{m.description}</p>
                                <div
                                    className="absolute bottom-4 right-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                                    style={{ color: m.accent }}
                                >
                                    Open →
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
