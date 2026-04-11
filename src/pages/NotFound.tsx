import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// Quick links shown on the 404 page
const QUICK_LINKS = [
    { href: "/products", labelKey: "notFound.links.products", label: "Products" },
    { href: "/applications", labelKey: "notFound.links.applications", label: "Applications" },
    { href: "/training", labelKey: "notFound.links.training", label: "Training" },
    { href: "/about", labelKey: "notFound.links.about", label: "About" },
];

export const NotFound = () => {
    const { t } = useTranslation("common");
    const navigate = useNavigate();
    const [glitch, setGlitch] = useState(false);

    // Trigger glitch effect periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <main
            className="min-h-screen text-white font-sans flex flex-col items-center justify-center relative overflow-hidden px-4 py-20"
            style={{ background: "#161622" }}
            aria-labelledby="not-found-heading"
        >
            {/* Ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(0,210,255,0.06) 0%, transparent 70%)" }}
                aria-hidden="true"
            />

            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,210,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
            />

            {/* Rotating rings */}
            {[280, 420, 560].map((size, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-aero-blue/[0.05] pointer-events-none"
                    style={{ width: size, height: size }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
                    aria-hidden="true"
                />
            ))}

            {/* 404 number — large glitch text */}
            <motion.div
                className="relative mb-6 select-none"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                aria-hidden="true"
            >
                <span
                    className="block text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter"
                    style={{
                        background: "linear-gradient(135deg, rgba(0,210,255,0.15), rgba(168,85,247,0.1))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: glitch ? "hue-rotate(40deg) brightness(1.4)" : "none",
                        transition: "filter 0.05s",
                    }}
                >
                    404
                </span>
                {/* Glitch layers */}
                {glitch && (
                    <>
                        <span
                            className="absolute inset-0 block text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter text-aero-blue/20"
                            style={{ clipPath: "inset(20% 0 60% 0)", transform: "translateX(-3px)" }}
                            aria-hidden="true"
                        >
                            404
                        </span>
                        <span
                            className="absolute inset-0 block text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter text-aero-purple/20"
                            style={{ clipPath: "inset(60% 0 20% 0)", transform: "translateX(3px)" }}
                            aria-hidden="true"
                        >
                            404
                        </span>
                    </>
                )}
            </motion.div>

            {/* Text */}
            <motion.div
                className="text-center max-w-lg relative z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-aero-blue/50" aria-hidden="true" />
                    <span className="text-aero-blue text-xs uppercase tracking-[0.3em] font-semibold flex items-center gap-1.5">
                        <Compass size={11} aria-hidden="true" />
                        {t("notFound.tag", "Page not found")}
                    </span>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-aero-blue/50" aria-hidden="true" />
                </div>

                <h1 id="not-found-heading" className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                    {t("notFound.title", "Lost in the airspace")}
                </h1>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10">
                    {t("notFound.subtitle", "The page you're looking for doesn't exist or has been moved. Let's get you back on course.")}
                </p>

                {/* Primary actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                    <motion.button
                        onClick={() => navigate(-1)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-7 py-3 rounded-full border border-white/[0.1] text-gray-300 hover:text-white hover:border-white/[0.22] text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
                    >
                        <ArrowLeft size={15} aria-hidden="true" />
                        {t("notFound.goBack", "Go back")}
                    </motion.button>

                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-aero-blue"
                        >
                            <Home size={15} aria-hidden="true" />
                            {t("notFound.goHome", "Go home")}
                        </motion.button>
                    </Link>
                </div>

                {/* Quick links */}
                <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-700 mb-4">{t("notFound.quickLinks", "Or jump to")}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {QUICK_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="px-3.5 py-1.5 rounded-full text-xs text-gray-500 border border-white/[0.07] hover:border-aero-blue/30 hover:text-aero-blue transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-aero-blue/40"
                            >
                                {t(link.labelKey, link.label)}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </main>
    );
};

export default NotFound;
