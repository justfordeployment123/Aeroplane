import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

/* ─── tiny SVG grid background ─────────────────────────────────────────── */
const GridBg = () => (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
);

/* ─── animated scan line ────────────────────────────────────────────────── */
const ScanLine = () => (
    <div
        className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-60"
        style={{ animation: "scanline 3s linear infinite" }}
    />
);

export default function AdminLogin() {
    const { login, isAuthenticated, loading, error, clearError } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || "/admin/dashboard";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [shake, setShake] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isAuthenticated) navigate(from, { replace: true });
    }, [isAuthenticated, navigate, from]);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    useEffect(() => {
        if (error) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    }, [error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;
        clearError();
        setSubmitting(true);
        try {
            await login(email.trim(), password);
        } catch {
            /* error displayed via context */
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-aero-dark flex items-center justify-center">
                <span className="text-sky-400 font-mono text-sm tracking-widest animate-pulse">VERIFYING SESSION…</span>
            </div>
        );
    }

    return (
        <>
            {/* inject scan-line keyframes once */}
            <style>{`
        @keyframes scanline {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shakeX {
          0%,100%{ transform:translateX(0) }
          20%    { transform:translateX(-8px) }
          40%    { transform:translateX(8px) }
          60%    { transform:translateX(-5px) }
          80%    { transform:translateX(5px) }
        }
        .shake { animation: shakeX 0.45s ease; }
        .fade-up { animation: fadeSlideUp 0.55s cubic-bezier(.16,1,.3,1) both; }
      `}</style>

            <div className="relative min-h-screen bg-aero-dark flex flex-col items-center justify-center overflow-hidden select-none">
                {/* Background layers */}
                <GridBg />
                <div className="absolute inset-0 bg-gradient-radial from-sky-900/10 via-transparent to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
                <ScanLine />

                {/* Card */}
                <div className={`fade-up relative z-10 w-full max-w-md mx-4 ${shake ? "shake" : ""}`}>
                    {/* Top accent bar */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-t-sm" />

                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-b-sm px-8 pt-10 pb-8 shadow-2xl shadow-black/60">
                        {/* Wordmark */}
                        <div className="mb-10 text-center">
                            <p className="font-mono text-[10px] tracking-[0.4em] text-sky-400/70 uppercase mb-3">Restricted Access</p>
                            <div className="flex items-center justify-center gap-3 mb-1">
                                {/* minimal hex icon */}
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.7" />
                                    <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="#38bdf8" opacity="0.15" />
                                    <circle cx="14" cy="14" r="2.5" fill="#38bdf8" opacity="0.9" />
                                </svg>
                                <h1 className="text-2xl font-bold tracking-tight text-white">Admin Portal</h1>
                            </div>
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent mx-auto mt-3" />
                        </div>

                        {/* Error banner */}
                        {error && (
                            <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded px-4 py-3">
                                <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm.75 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-red-400 text-sm font-mono leading-relaxed">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            {/* Email */}
                            <div className="group">
                                <label className="block font-mono text-[10px] tracking-[0.25em] text-sky-400/70 uppercase mb-2">Email Address</label>
                                <div className="relative">
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            clearError();
                                        }}
                                        autoComplete="username"
                                        required
                                        placeholder="admin@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/20 font-mono
                               focus:outline-none focus:border-sky-500/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-sky-500/30
                               transition-all duration-200"
                                    />
                                    {/* left accent on focus */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l bg-sky-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="group">
                                <label className="block font-mono text-[10px] tracking-[0.25em] text-sky-400/70 uppercase mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPass ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            clearError();
                                        }}
                                        autoComplete="current-password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 pr-12 text-sm text-white placeholder-white/20 font-mono
                               focus:outline-none focus:border-sky-500/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-sky-500/30
                               transition-all duration-200"
                                    />
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l bg-sky-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass((p) => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-sky-400 transition-colors duration-150 focus:outline-none"
                                        tabIndex={-1}
                                        aria-label={showPass ? "Hide password" : "Show password"}
                                    >
                                        {showPass ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={submitting || !email || !password}
                                className="relative w-full mt-2 py-3 px-6 rounded font-mono text-xs tracking-[0.25em] uppercase font-semibold
                           bg-sky-500/10 border border-sky-500/40 text-sky-300
                           hover:bg-sky-500/20 hover:border-sky-400/60 hover:text-sky-200
                           focus:outline-none focus:ring-2 focus:ring-sky-500/40
                           disabled:opacity-40 disabled:cursor-not-allowed
                           transition-all duration-200 group overflow-hidden"
                            >
                                {/* shimmer */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {submitting ? (
                                        <>
                                            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Authenticating…
                                        </>
                                    ) : (
                                        <>
                                            Authenticate
                                            <svg
                                                className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="mt-8 text-center font-mono text-[10px] tracking-widest text-white/15 uppercase">
                            Unauthorised access is prohibited
                        </p>
                    </div>
                </div>

                {/* Corner brackets */}
                {[
                    "top-4 left-4 border-t border-l",
                    "top-4 right-4 border-t border-r",
                    "bottom-4 left-4 border-b border-l",
                    "bottom-4 right-4 border-b border-r",
                ].map((cls) => (
                    <div key={cls} className={`absolute ${cls} w-6 h-6 border-sky-500/20`} />
                ))}
            </div>
        </>
    );
}
