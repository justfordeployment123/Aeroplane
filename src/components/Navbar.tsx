import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Search, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"}`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-aero-blue to-aero-purple tracking-tighter">
                    AERONEXUS
                </div>

                <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                    <li>
                        <Link to="/" className="hover:text-aero-blue cursor-pointer transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-aero-blue cursor-pointer transition-colors">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/economy" className="hover:text-aero-blue cursor-pointer transition-colors">
                            Low Altitude Economy
                        </Link>
                    </li>
                    <li>
                        <Link to="/applications" className="hover:text-aero-blue transition-colors">
                            Applications
                        </Link>
                    </li>{" "}
                    <li>
                        <Link to="/products" className="hover:text-aero-blue transition-colors">
                            Series Products
                        </Link>
                    </li>{" "}
                    <li>
                        <Link to="/training" className="hover:text-aero-blue transition-colors">
                            Training Center
                        </Link>
                    </li>
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
    );
};
