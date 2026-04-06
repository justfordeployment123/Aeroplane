import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navRoutes = [
    { key: "home", to: "/" },
    { key: "about", to: "/about" },
    { key: "economy", to: "/economy" },
    { key: "applications", to: "/applications" },
    { key: "products", to: "/products" },
    { key: "training", to: "/training" },
    { key: "contact", to: "/contact" },
];

const languages = [
    { code: "en", label: "EN", full: "English" },
    { code: "zh", label: "中文", full: "中文" },
];

export const Navbar = () => {
    const { t, i18n } = useTranslation("layout");
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const location = useLocation();

    const currentLang = languages.find((l) => l.code === i18n.language) ?? languages[0];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setLangOpen(false);
    }, [location.pathname]);

    const switchLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setLangOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled ? "bg-aero-darker/90 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/drone_logo.png" alt="GAADT" className="h-14 w-auto object-contain" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple tracking-tighter">
                            GAADT
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                        {navRoutes.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className={`relative py-1 cursor-pointer transition-colors ${
                                        location.pathname === item.to ? "text-aero-blue" : "hover:text-aero-blue"
                                    }`}
                                >
                                    {t(`nav.${item.key}`)}
                                    {location.pathname === item.to && (
                                        <motion.div
                                            layoutId="navIndicator"
                                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-aero-blue rounded-full"
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center space-x-6 text-gray-300">
                        <Search className="w-5 h-5 hover:text-aero-blue cursor-pointer transition-colors" />

                        {/* Language switcher */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen((v) => !v)}
                                className="flex items-center gap-1.5 text-sm hover:text-aero-blue transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{currentLang.label}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-8 w-32 rounded-xl border border-white/10 overflow-hidden shadow-xl"
                                        style={{ background: "#1c1c2a" }}
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => switchLanguage(lang.code)}
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                                                    i18n.language === lang.code
                                                        ? "text-aero-blue bg-aero-blue/10"
                                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                                }`}
                                            >
                                                <span>{lang.full}</span>
                                                {i18n.language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-aero-blue" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-aero-darker/95 backdrop-blur-xl pt-24 px-6 md:hidden"
                    >
                        <ul className="space-y-1">
                            {navRoutes.map((item, idx) => (
                                <motion.li
                                    key={item.to}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                >
                                    <Link
                                        to={item.to}
                                        className={`block py-4 text-lg font-medium border-b border-white/5 transition-colors ${
                                            location.pathname === item.to ? "text-aero-blue" : "text-gray-300 hover:text-white"
                                        }`}
                                    >
                                        {t(`nav.${item.key}`)}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-10 flex items-center gap-6 text-gray-400"
                        >
                            <Search className="w-5 h-5 hover:text-aero-blue cursor-pointer transition-colors" />

                            {/* Mobile language switcher */}
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                {languages.map((lang, i) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => switchLanguage(lang.code)}
                                        className={`text-sm transition-colors ${
                                            i18n.language === lang.code ? "text-aero-blue font-semibold" : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        {lang.label}
                                        {i < languages.length - 1 && <span className="ml-2 text-gray-700">/</span>}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
