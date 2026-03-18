import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe, Plane } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Low Altitude Economy", to: "/economy" },
    { label: "Applications", to: "/applications" },
    { label: "Series Products", to: "/products" },
    { label: "Training Center", to: "/training" },

    { label: "Contact Us", to: "/contact" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aero-blue to-aero-purple flex items-center justify-center">
                            <Plane className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple tracking-tighter">
                            GAADT
                        </span>
                    </Link>

                    <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className={`relative py-1 cursor-pointer transition-colors ${location.pathname === item.to ? "text-aero-blue" : "hover:text-aero-blue"}`}
                                >
                                    {item.label}
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

                    <div className="hidden md:flex items-center space-x-6 text-gray-300">
                        <Search className="w-5 h-5 hover:text-aero-blue cursor-pointer transition-colors" />
                        <div className="flex items-center space-x-1 cursor-pointer hover:text-aero-blue transition-colors">
                            <Globe className="w-4 h-4" />
                            <span className="text-sm">EN</span>
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
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden"
                    >
                        <ul className="space-y-1">
                            {navItems.map((item, idx) => (
                                <motion.li
                                    key={item.to}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                >
                                    <Link
                                        to={item.to}
                                        className={`block py-4 text-lg font-medium border-b border-white/5 transition-colors ${location.pathname === item.to ? "text-aero-blue" : "text-gray-300 hover:text-white"}`}
                                    >
                                        {item.label}
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
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-aero-blue transition-colors">
                                <Globe className="w-4 h-4" />
                                <span className="text-sm">EN</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
