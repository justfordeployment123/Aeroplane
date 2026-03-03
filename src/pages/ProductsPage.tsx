import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Plane, Rocket, MonitorDot, Cpu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const productCategories = [
    {
        id: "uav",
        title: "UAV",
        subtitle: "Unmanned Aerial Vehicles",
        description: "High-performance fixed-wing and multi-rotor platforms engineered for precision logistics.",
        icon: Plane,
        accent: "#00d2ff",
        products: [
            { name: "FP-98 Large Fixed Wing UAV", tag: "Fixed Wing", img: "https://www.htsdfp.com/UploadFiles/2024-10-10/paergxakh48z8g8g.png" },
            { name: "FP-985 Large Fixed Wing UAV", tag: "Fixed Wing", img: "https://www.htsdfp.com/UploadFiles/2024-09-02/2fras71mxkygm1fs.png" },
            { name: "FP-981C VTOL Composite Wing UAV", tag: "VTOL", img: "https://www.htsdfp.com/UploadFiles/2024-02-22/mczryvs1tpadubtt.png" },
            { name: "FP-981A Multi-Rotor UAV", tag: "Multi-Rotor", img: "https://www.htsdfp.com/UploadFiles/2024-10-17/trkxvkfb6kupqpuf.png" },
            { name: "FP-980-7B Terminal Auto Airport", tag: "Infrastructure", img: "https://www.htsdfp.com/UploadFiles/2024-02-22/b2x9tcljght2gygz.png" },
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
            { name: "FP-981CS VTOL Composite Wing UAV", tag: "Special Ops", img: "https://www.htsdfp.com/UploadFiles/2024-05-16/qezfaz4v8z3sg2jb.png" },
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
            { name: "FP-980-1 Handheld Control Terminal", tag: "Portable", img: "https://www.htsdfp.com/UploadFiles/2024-05-16/btv6ke6rklukgb1y.png" },
            { name: "FP-980-2 Portable Control Terminal", tag: "Portable", img: "https://www.htsdfp.com/UploadFiles/2024-05-16/bzcbm4cwswbdrdng.png" },
            { name: "FP-980-3B Enhanced Shelter Station", tag: "Shelter", img: "https://www.htsdfp.com/UploadFiles/2024-10-10/mtb1hxgg8tzbrx28.png" },
            { name: "FP-980-3C Vehicle Mounted Shelter", tag: "Vehicle", img: "https://www.htsdfp.com/UploadFiles/2024-02-22/surm42ur5g91map5.png" },
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
            { name: "UAV Operation Control System", tag: "Software", img: "https://www.htsdfp.com/UploadFiles/2024-02-22/cj3putets7p9phkh.png" },
        ],
    },
];

/* ── 3D Holographic Product Card ── */
const HoloProductCard = ({
    product,
    accent,
    idx,
}: {
    product: { name: string; tag: string; img: string };
    accent: string;
    idx: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 });
    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.6 }}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={handleLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative cursor-pointer"
            >
                <div
                    className="relative rounded-2xl overflow-hidden flex flex-col"
                    style={{
                        background: "#08080e",
                        border: "1px solid rgba(255,255,255,0.05)",
                    }}
                >
                    {/* Holographic glare effect */}
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: useTransform(
                                [glareX, glareY],
                                ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 50%)`
                            ),
                        }}
                    />

                    {/* Scan line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Image area */}
                    <div className="relative h-56 flex items-center justify-center p-6 overflow-hidden">
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                            style={{ background: accent }}
                        />

                        {/* Grid floor */}
                        <div
                            className="absolute bottom-0 inset-x-0 h-1/2 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                            style={{
                                backgroundImage: `linear-gradient(${accent}40 1px, transparent 1px), linear-gradient(90deg, ${accent}40 1px, transparent 1px)`,
                                backgroundSize: "30px 30px",
                                maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                            }}
                        />

                        <motion.img
                            src={product.img}
                            alt={product.name}
                            className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                            style={{ transform: "translateZ(30px)" }}
                            whileHover={{ scale: 1.1, y: -8 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                    </div>

                    {/* Divider */}
                    <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }} />

                    {/* Info */}
                    <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                        <div>
                            <span
                                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md inline-block mb-3"
                                style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}20` }}
                            >
                                {product.tag}
                            </span>
                            <h3 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors leading-snug">
                                {product.name}
                            </h3>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-medium text-gray-600 group-hover:text-gray-400 transition-colors">View Specs</span>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/[0.06] group-hover:border-transparent transition-all"
                                style={{ background: `linear-gradient(135deg, transparent, ${accent}15)` }}
                            >
                                <ArrowRight size={13} style={{ color: accent }} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const ProductsPage = () => {
    const [activeSection, setActiveSection] = useState("uav");

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        productCategories.forEach((cat) => {
            const el = document.getElementById(cat.id);
            if (!el) return;
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) setActiveSection(cat.id);
            }, { rootMargin: "-40% 0px -55% 0px" });
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050508" }}>
            {/* ── Hero with HUD overlay ── */}
            <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://www.htsdfp.com/UploadFiles/2024-10-30/hz7kcrbdstehju8t.png')",
                        filter: "brightness(0.25) saturate(1.4)",
                    }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #050508 8%, rgba(5,5,8,0.7) 50%, transparent 100%)" }} />

                {/* HUD corners */}
                <div className="absolute top-24 left-8 w-20 h-20 border-t border-l border-aero-blue/20 hidden lg:block" />
                <div className="absolute top-24 right-8 w-20 h-20 border-t border-r border-aero-blue/20 hidden lg:block" />
                <div className="absolute bottom-16 left-8 w-20 h-20 border-b border-l border-aero-blue/20 hidden lg:block" />
                <div className="absolute bottom-16 right-8 w-20 h-20 border-b border-r border-aero-blue/20 hidden lg:block" />

                {/* HUD data readouts */}
                <div className="absolute top-28 left-12 text-[10px] text-aero-blue/40 font-mono space-y-1 hidden lg:block">
                    <div>SYS.STATUS: ONLINE</div>
                    <div>FLEET.COUNT: 11</div>
                    <div>CAT.LOADED: 04</div>
                </div>
                <div className="absolute top-28 right-12 text-[10px] text-aero-blue/40 font-mono text-right space-y-1 hidden lg:block">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                        SCANNING...
                    </motion.div>
                </div>

                {/* Horizontal scan line */}
                <motion.div
                    className="absolute left-0 right-0 h-[1px] z-[2]"
                    style={{ background: "linear-gradient(90deg, transparent 5%, rgba(0,210,255,0.3) 30%, rgba(0,210,255,0.5) 50%, rgba(0,210,255,0.3) 70%, transparent 95%)" }}
                    animate={{ top: ["20%", "80%", "20%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-black/40 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            Fleet & Hardware
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none">
                            Series{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Products</span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-lg mx-auto mt-3">
                            A complete ecosystem of UAVs, control stations, and intelligent systems.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
                            <motion.div className="w-1 h-1 bg-aero-blue rounded-full" animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Sticky Nav ── */}
            <div
                className="sticky top-18 z-40 border-b"
                style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.06)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
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

            {/* ── Catalog with 3D Cards ── */}
            <section className="py-24 relative overflow-hidden">
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
                                    <div className="flex items-center gap-6">
                                        <div className="h-px flex-1 max-w-20 rounded-full" style={{ background: `linear-gradient(to right, ${category.accent}, transparent)` }} />
                                        <p className="text-gray-500 text-sm max-w-xl">{category.description}</p>
                                    </div>
                                </motion.div>

                                {/* 3D Product Grid */}
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
                                        <HoloProductCard key={pIdx} product={product} accent={category.accent} idx={pIdx} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── Footer CTA ── */}
            <section className="py-32 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0">
                    {/* Blueprint grid */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)`,
                            backgroundSize: "80px 80px",
                        }}
                    />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/[0.05] rounded-full blur-[200px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Ready to Deploy
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Your Fleet?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                        Contact our specialists for custom configurations and enterprise solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                Request a Quote
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                        <Link to="/applications">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-4 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300"
                            >
                                View Applications
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ProductsPage;
