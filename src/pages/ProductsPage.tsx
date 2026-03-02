import { motion } from "framer-motion";
import { ArrowRight, Plane, Rocket, MonitorDot, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

const productCategories = [
    {
        id: "uav",
        title: "UAV",
        subtitle: "Unmanned Aerial Vehicles",
        description: "High-performance fixed-wing and multi-rotor platforms engineered for precision logistics.",
        icon: Plane,
        accent: "#00d2ff",
        products: [
            {
                name: "FP-98 Large Fixed Wing UAV",
                tag: "Fixed Wing",
                img: "https://www.htsdfp.com/UploadFiles/2024-10-10/paergxakh48z8g8g.png",
            },
            {
                name: "FP-985 Large Fixed Wing UAV",
                tag: "Fixed Wing",
                img: "https://www.htsdfp.com/UploadFiles/2024-09-02/2fras71mxkygm1fs.png",
            },
            {
                name: "FP-981C VTOL Composite Wing UAV",
                tag: "VTOL",
                img: "https://www.htsdfp.com/UploadFiles/2024-02-22/mczryvs1tpadubtt.png",
            },
            {
                name: "FP-981A Multi-Rotor UAV",
                tag: "Multi-Rotor",
                img: "https://www.htsdfp.com/UploadFiles/2024-10-17/trkxvkfb6kupqpuf.png",
            },
            {
                name: "FP-980-7B Terminal Auto Airport",
                tag: "Infrastructure",
                img: "https://www.htsdfp.com/UploadFiles/2024-02-22/b2x9tcljght2gygz.png",
            },
        ],
    },
    {
        id: "special",
        title: "Special Aircraft",
        subtitle: "Mission-Critical Platforms",
        description: "Specialized composite-wing aircraft engineered for demanding operational environments.",
        icon: Rocket,
        accent: "#a855f7",
        products: [
            {
                name: "FP-981CS VTOL Composite Wing UAV",
                tag: "Special Ops",
                img: "https://www.htsdfp.com/UploadFiles/2024-05-16/qezfaz4v8z3sg2jb.png",
            },
        ],
    },
    {
        id: "ground-station",
        title: "Ground Control Station",
        subtitle: "Command & Control Hardware",
        description: "Ruggedized control terminals from handheld units to vehicle-mounted command shelters.",
        icon: MonitorDot,
        accent: "#06b6d4",
        products: [
            {
                name: "FP-980-1 Handheld Control Terminal",
                tag: "Portable",
                img: "https://www.htsdfp.com/UploadFiles/2024-05-16/btv6ke6rklukgb1y.png",
            },
            {
                name: "FP-980-2 Portable Control Terminal",
                tag: "Portable",
                img: "https://www.htsdfp.com/UploadFiles/2024-05-16/bzcbm4cwswbdrdng.png",
            },
            {
                name: "FP-980-3B Enhanced Shelter Station",
                tag: "Shelter",
                img: "https://www.htsdfp.com/UploadFiles/2024-10-10/mtb1hxgg8tzbrx28.png",
            },
            {
                name: "FP-980-3C Vehicle Mounted Shelter",
                tag: "Vehicle",
                img: "https://www.htsdfp.com/UploadFiles/2024-02-22/surm42ur5g91map5.png",
            },
        ],
    },
    {
        id: "control-system",
        title: "UAV Control System",
        subtitle: "Intelligent Flight Software",
        description: "Integrated operation control systems for autonomous fleet management and mission planning.",
        icon: Cpu,
        accent: "#10b981",
        products: [
            {
                name: "UAV Operation Control System",
                tag: "Software",
                img: "https://www.htsdfp.com/UploadFiles/2024-02-22/cj3putets7p9phkh.png",
            },
        ],
    },
];

// const NavDot = ({ active }: { active: boolean }) => (
//   <span
//     className="inline-block w-1.5 h-1.5 rounded-full mr-2 transition-all duration-300"
//     style={{ background: active ? "#00d2ff" : "rgba(255,255,255,0.2)", boxShadow: active ? "0 0 6px #00d2ff" : "none" }}
//   />
// );

export const ProductsPage = () => {
    const [activeSection, setActiveSection] = useState("uav");

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        productCategories.forEach((cat) => {
            const el = document.getElementById(cat.id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(cat.id);
                },
                { rootMargin: "-40% 0px -55% 0px" },
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 140;
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050508" }}>
            {/* ── Hero ── */}
            <section className="relative h-[55vh] min-h-100 flex items-center justify-center overflow-hidden">
                {/* bg image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://www.htsdfp.com/UploadFiles/2024-10-30/hz7kcrbdstehju8t.png')",
                        filter: "brightness(0.35) saturate(1.2)",
                    }}
                />
                {/* gradient overlays */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #050508 10%, transparent 60%)" }} />
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,210,255,0.12) 0%, transparent 70%)" }}
                />
                {/* grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />

                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
                        <span
                            className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-5 px-4 py-1.5 rounded-full"
                            style={{ color: "#00d2ff", background: "rgba(0,210,255,0.08)", border: "1px solid rgba(0,210,255,0.2)" }}
                        >
                            Fleet & Hardware
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-none">
                            Series{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #00d2ff 0%, #a855f7 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Products
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-lg mx-auto mt-3">
                            A complete ecosystem of UAVs, control stations, and intelligent systems.
                        </p>
                    </motion.div>

                    {/* scroll cue */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-1 h-2 rounded-full bg-white/40"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Sticky Nav ── */}
            <div
                className="sticky top-18 z-40 border-b"
                style={{
                    background: "rgba(5,5,8,0.85)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.06)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-0 overflow-x-auto">
                    <ul className="flex min-w-max">
                        {productCategories.map((cat) => {
                            const Icon = cat.icon;
                            const active = activeSection === cat.id;
                            return (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => scrollToCategory(cat.id)}
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

            {/* ── Catalog ── */}
            <section className="py-24 relative overflow-hidden">
                {/* ambient decoration */}
                <div
                    className="absolute top-0 right-0 w-150 h-150 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(0,210,255,0.04) 0%, transparent 70%)", filter: "blur(40px)" }}
                />

                <div className="max-w-7xl mx-auto px-6 space-y-36">
                    {productCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div key={category.id} id={category.id} className="scroll-mt-40">
                                {/* Category Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="mb-14"
                                >
                                    <div className="flex items-center gap-5 mb-5">
                                        {/* icon box */}
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                                            style={{
                                                background: `linear-gradient(135deg, ${category.accent}20, ${category.accent}08)`,
                                                border: `1px solid ${category.accent}30`,
                                                boxShadow: `0 0 30px ${category.accent}18`,
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

                                    <div className="flex items-center gap-6">
                                        <div
                                            className="h-px flex-1 max-w-20 rounded-full"
                                            style={{ background: `linear-gradient(to right, ${category.accent}, transparent)` }}
                                        />
                                        <p className="text-gray-500 text-sm max-w-xl">{category.description}</p>
                                    </div>
                                </motion.div>

                                {/* Product Grid */}
                                <div
                                    className={`grid gap-5 ${
                                        category.products.length === 1
                                            ? "grid-cols-1 max-w-sm"
                                            : category.products.length === 2
                                              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                                              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                    }`}
                                >
                                    {category.products.map((product, pIdx) => (
                                        <motion.div
                                            key={pIdx}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: pIdx * 0.08, duration: 0.5 }}
                                            whileHover={{ y: -5, transition: { duration: 0.25 } }}
                                            className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                                            style={{
                                                background: "linear-gradient(160deg, #0e0e14 0%, #080810 100%)",
                                                border: "1px solid rgba(255,255,255,0.07)",
                                            }}
                                        >
                                            {/* hover border */}
                                            <div
                                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                                                style={{ boxShadow: `inset 0 0 0 1px ${category.accent}40, 0 20px 60px -15px ${category.accent}25` }}
                                            />

                                            {/* image area */}
                                            <div
                                                className="relative h-52 flex items-center justify-center p-6 overflow-hidden"
                                                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)" }}
                                            >
                                                {/* glow */}
                                                <div
                                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                                    style={{
                                                        background: `radial-gradient(ellipse at 50% 60%, ${category.accent}15 0%, transparent 65%)`,
                                                    }}
                                                />
                                                {/* corner accents */}
                                                <div
                                                    className="absolute top-3 left-3 w-4 h-4 border-t border-l opacity-20 group-hover:opacity-60 transition-opacity"
                                                    style={{ borderColor: category.accent }}
                                                />
                                                <div
                                                    className="absolute top-3 right-3 w-4 h-4 border-t border-r opacity-20 group-hover:opacity-60 transition-opacity"
                                                    style={{ borderColor: category.accent }}
                                                />
                                                <div
                                                    className="absolute bottom-3 left-3 w-4 h-4 border-b border-l opacity-20 group-hover:opacity-60 transition-opacity"
                                                    style={{ borderColor: category.accent }}
                                                />
                                                <div
                                                    className="absolute bottom-3 right-3 w-4 h-4 border-b border-r opacity-20 group-hover:opacity-60 transition-opacity"
                                                    style={{ borderColor: category.accent }}
                                                />

                                                <img
                                                    src={product.img}
                                                    alt={product.name}
                                                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)] group-hover:scale-[1.08] group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                                                />
                                            </div>

                                            {/* divider */}
                                            <div
                                                className="h-px mx-0 transition-all duration-500"
                                                style={{
                                                    background: `linear-gradient(to right, transparent, ${category.accent}30, transparent)`,
                                                }}
                                            />

                                            {/* info */}
                                            <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span
                                                            className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                                                            style={{
                                                                color: category.accent,
                                                                background: `${category.accent}12`,
                                                                border: `1px solid ${category.accent}22`,
                                                            }}
                                                        >
                                                            {product.tag}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors leading-snug">
                                                        {product.name}
                                                    </h3>
                                                </div>

                                                <button
                                                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                                                    style={{ color: category.accent, opacity: 0.7 }}
                                                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                                                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")}
                                                >
                                                    View Specs
                                                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── Footer CTA ── */}
            <section className="py-24 relative overflow-hidden border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,210,255,0.07) 0%, transparent 60%)" }}
                />
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 text-center px-6 max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Ready to deploy your fleet?</h2>
                    <p className="text-gray-500 mb-8 text-base">Contact our specialists for custom configurations and enterprise solutions.</p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <button
                            className="px-7 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                background: "linear-gradient(135deg, #00d2ff, #a855f7)",
                                color: "#000",
                                boxShadow: "0 0 30px rgba(0,210,255,0.25)",
                            }}
                        >
                            Request a Quote
                        </button>
                        <button
                            className="px-7 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:border-white/30"
                            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
                        >
                            Download Catalog
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ProductsPage;
