import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { HoloCard } from "../components/products/HoloCard";
import { ProductDetail } from "./ProductDetail";

export const ProductsPage = () => {
    const { translatedCategories, t } = useProducts();
    const [activeSection, setActiveSection] = useState(translatedCategories[0]?.id ?? "uav");
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    useEffect(() => {
        if (selectedProductId) return;
        const observers: IntersectionObserver[] = [];
        translatedCategories.forEach((cat) => {
            const el = document.getElementById(cat.id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([e]) => {
                    if (e.isIntersecting) setActiveSection(cat.id);
                },
                { rootMargin: "-35% 0px -55% 0px" },
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [selectedProductId, translatedCategories]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
    };

    if (selectedProductId) {
        return (
            <ProductDetail
                productId={selectedProductId}
                onBack={() => {
                    setSelectedProductId(null);
                    setTimeout(() => window.scrollTo({ top: 0 }), 50);
                }}
                onNavigate={(id) => setSelectedProductId(id)}
            />
        );
    }

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/banners/products-hero.jpg')",
                        filter: "brightness(0.25) saturate(1.4)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #161622 8%, rgba(22,22,34,0.7) 50%, transparent 100%)" }}
                />
                <div className="absolute top-24 left-8 w-20 h-20 border-t border-l border-aero-blue/20 hidden lg:block" />
                <div className="absolute top-24 right-8 w-20 h-20 border-t border-r border-aero-blue/20 hidden lg:block" />
                <div className="absolute bottom-16 left-8 w-20 h-20 border-b border-l border-aero-blue/20 hidden lg:block" />
                <div className="absolute bottom-16 right-8 w-20 h-20 border-b border-r border-aero-blue/20 hidden lg:block" />
                <div className="absolute top-28 left-12 text-[10px] text-aero-blue/40 font-mono space-y-1 hidden lg:block">
                    <div>SYS.STATUS: ONLINE</div>
                    <div>FLEET.COUNT: 11</div>
                    <div>CAT.LOADED: 04</div>
                </div>
                <div className="absolute top-28 right-12 text-[10px] text-aero-blue/40 font-mono text-right hidden lg:block">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                        SCANNING...
                    </motion.div>
                </div>
                <motion.div
                    className="absolute left-0 right-0 h-[1px] z-[2]"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 5%, rgba(0,210,255,0.3) 30%, rgba(0,210,255,0.5) 50%, rgba(0,210,255,0.3) 70%, transparent 95%)",
                    }}
                    animate={{ top: ["20%", "80%", "20%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ y: 28 }} animate={{ y: 0 }} transition={{ duration: 0.9 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-card/80 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            {t("hero.tag")}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none">
                            {t("hero.title").split(" ")[0]}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t("hero.title").split(" ").slice(1).join(" ")}
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-lg mx-auto mt-3">{t("hero.subtitle")}</p>
                    </motion.div>
                </div>
                <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" transition={{ delay: 1.5 }}>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
                            <motion.div
                                className="w-1 h-1 bg-aero-blue rounded-full"
                                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Sticky Nav */}
            <div
                className="sticky top-[72px] z-40 border-b"
                style={{
                    background: "rgba(22,22,34,0.88)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.06)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
                    <ul className="flex min-w-max">
                        {translatedCategories.map((cat) => {
                            const Icon = cat.icon;
                            const active = activeSection === cat.id;
                            return (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => scrollTo(cat.id)}
                                        className="relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-all duration-200"
                                        style={{ color: active ? cat.accent : "rgba(255,255,255,0.45)" }}
                                    >
                                        <Icon size={15} />
                                        {cat.title}
                                        {active && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                                                style={{ background: cat.accent }}
                                            />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Catalog */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 space-y-24">
                    {translatedCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div key={category.id} id={category.id} className="scroll-mt-36">
                                <motion.div
                                    initial={{ y: 24 }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true, margin: "200px 0px" }}
                                    transition={{ duration: 0.6 }}
                                    className="mb-14"
                                >
                                    <div className="flex items-center gap-5 mb-5">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                                            style={{
                                                background: `linear-gradient(135deg, ${category.accent}20, ${category.accent}05)`,
                                                border: `1px solid ${category.accent}25`,
                                                boxShadow: `0 0 30px ${category.accent}15`,
                                            }}
                                        >
                                            <Icon size={24} style={{ color: category.accent }} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: category.accent }}>
                                                {category.subtitle}
                                            </p>
                                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{category.title}</h2>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm max-w-xl mt-4 ml-[76px]">{category.description}</p>
                                </motion.div>
                                <div
                                    className={`grid gap-6 ${
                                        category.products.length === 1
                                            ? "grid-cols-1 max-w-sm"
                                            : category.products.length === 2
                                              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                                              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    }`}
                                >
                                    {category.products.map((product, pIdx) => (
                                        <HoloCard
                                            key={product.id}
                                            product={product}
                                            accent={category.accent}
                                            idx={pIdx}
                                            onClick={() => setSelectedProductId(product.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 relative overflow-hidden border-t border-white/5">
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "80px 80px",
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/[0.05] rounded-full blur-[200px] pointer-events-none" />
                <motion.div
                    initial={{ y: 24 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "200px 0px" }}
                    className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {t("cta.title").split("\n")[0]}
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("cta.title").split("\n")[1]}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">{t("cta.subtitle")}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                {t("cta.requestQuote")} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                        <Link to="/applications">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-4 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300"
                            >
                                {t("cta.viewApplications")}
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};