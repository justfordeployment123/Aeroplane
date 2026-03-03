import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
    FileText,
    ArrowRight,
    Globe2,
    TrendingUp,
    Truck,
    Building2,
    Plane,
    Shield,
    Zap,
    Network,
    Target,
    BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ── Data ────────────────────────────────────────────────── */

const ecosystemPillars = [
    {
        icon: Truck,
        title: "Smart Logistics",
        desc: "Autonomous aerial corridors connecting major distribution hubs with branch and terminal delivery networks.",
        accent: "#00d2ff",
        stat: "60%",
        statLabel: "Cost Reduction",
        backDetails: ["Automated route planning", "Real-time fleet tracking", "Weather-adaptive corridors", "Cross-border logistics"],
    },
    {
        icon: Shield,
        title: "Emergency Response",
        desc: "Rapid-deployment UAV systems for disaster relief, medical supply delivery, and search & rescue operations.",
        accent: "#f97316",
        stat: "<5min",
        statLabel: "Deploy Time",
        backDetails: ["Medical payload delivery", "Thermal search & rescue", "Disaster zone mapping", "Emergency broadcast relay"],
    },
    {
        icon: Building2,
        title: "Urban Air Mobility",
        desc: "Integrating low-altitude flight paths into urban infrastructure for passenger and cargo transport.",
        accent: "#a855f7",
        stat: "3D",
        statLabel: "Transport Grid",
        backDetails: ["Vertiport network design", "Air traffic management", "Noise-optimized routes", "Multi-modal integration"],
    },
    {
        icon: Globe2,
        title: "Agricultural Aviation",
        desc: "Precision agriculture with autonomous spraying, seeding, and crop monitoring across vast farmlands.",
        accent: "#10b981",
        stat: "10x",
        statLabel: "Efficiency Gain",
        backDetails: ["Precision spraying systems", "Crop health monitoring", "Autonomous seeding", "Yield prediction analytics"],
    },
];

const policyTimeline = [
    {
        year: "2021",
        title: "National Strategic Priority",
        desc: "Low-altitude economy formally included in the national strategic economic development framework.",
    },
    {
        year: "2023",
        title: "Airspace Reform",
        desc: "Comprehensive reforms to low-altitude airspace management enabling commercial UAV operations at scale.",
    },
    {
        year: "2024",
        title: "Infrastructure Build-out",
        desc: "Nationwide deployment of UAV takeoff/landing sites, vertiports, and air traffic management systems.",
    },
    {
        year: "2025",
        title: "Trillion-Yuan Market",
        desc: "Low-altitude economy projected to surpass ¥1.5 trillion, driving manufacturing, services, and logistics.",
    },
];

const stats = [
    { value: "¥1.5T", label: "Market Size by 2025", icon: TrendingUp },
    { value: "120+", label: "Approved Air Routes", icon: Plane },
    { value: "50+", label: "Pilot Cities", icon: Building2 },
    { value: "1M+", label: "Projected UAV Fleet", icon: Network },
];

const keyAdvantages = [
    {
        icon: Zap,
        title: "Transportation Efficiency",
        desc: "Reduce logistics time by up to 70% through direct aerial corridors, bypassing ground congestion entirely.",
    },
    {
        icon: Target,
        title: "Precision Operations",
        desc: "AI-powered navigation and mission planning ensure centimeter-level accuracy in all flight operations.",
    },
    {
        icon: BarChart3,
        title: "Economic Impact",
        desc: "Every ¥1 invested in low-altitude infrastructure generates ¥3-5 in downstream economic activity.",
    },
];

/* ── 3D Prism Card ───────────────────────────────────────── */
/* Each pillar card is a 3D prism that tilts toward the mouse
   and reveals a secondary face on hover with extra details   */

const PrismCard = ({ pillar, idx }: { pillar: (typeof ecosystemPillars)[0]; idx: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
    const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

    const handleMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => { mx.set(0); my.set(0); };

    const Icon = pillar.icon;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.6 }}
            style={{ rotateX: rotX, rotateY: rotY, perspective: 800, transformStyle: "preserve-3d" } as React.CSSProperties}
            className="group relative rounded-3xl cursor-default"
        >
            {/* Main face */}
            <div
                className="relative rounded-3xl p-8 overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #0e0e14 0%, #080810 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Depth glow on hover */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${pillar.accent}40, 0 20px 60px -15px ${pillar.accent}25` }}
                />
                {/* Top edge light */}
                <div
                    className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${pillar.accent}, transparent)` }}
                />

                {/* Ghost number at depth */}
                <div
                    className="absolute top-2 right-4 text-[90px] font-black leading-none pointer-events-none text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="flex items-start gap-5" style={{ transform: "translateZ(30px)" }}>
                    <div
                        className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                            background: `linear-gradient(135deg, ${pillar.accent}22, ${pillar.accent}08)`,
                            border: `1px solid ${pillar.accent}30`,
                            boxShadow: `0 0 24px ${pillar.accent}15`,
                        }}
                    >
                        <Icon className="w-6 h-6" style={{ color: pillar.accent }} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 group-hover:text-gray-400 transition-colors">
                            {pillar.desc}
                        </p>
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{ background: `${pillar.accent}10`, border: `1px solid ${pillar.accent}25` }}
                        >
                            <span className="font-bold text-sm" style={{ color: pillar.accent }}>{pillar.stat}</span>
                            <span className="text-gray-400 text-xs">{pillar.statLabel}</span>
                        </div>
                    </div>
                </div>

                {/* Hover-reveal detail list — slides up from bottom */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-b-3xl px-8 pb-6 pt-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                    style={{
                        background: `linear-gradient(to top, ${pillar.accent}18 0%, transparent 100%)`,
                        transform: "translateZ(40px)",
                    }}
                >
                    <div className="flex flex-wrap gap-2">
                        {pillar.backDetails.map((d, i) => (
                            <span
                                key={i}
                                className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                                style={{ background: `${pillar.accent}15`, color: pillar.accent, border: `1px solid ${pillar.accent}30` }}
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

/* ── 3D Depth Timeline ───────────────────────────────────── */
/* Items float at staggered Z-depths with perspective,
   creating a corridor-like 3D feel on scroll              */

const DepthTimelineItem = ({ item, idx }: { item: (typeof policyTimeline)[0]; idx: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
    const z = useTransform(scrollYProgress, [0, 1], [-60, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity, z, perspective: 600 }}
            className="relative"
        >
            <div className="flex items-center gap-6 md:gap-10">
                {/* Year orb */}
                <div className="relative shrink-0">
                    <motion.div
                        className="w-20 h-20 rounded-full flex items-center justify-center relative"
                        style={{
                            background: "radial-gradient(circle at 30% 30%, rgba(0,210,255,0.2), rgba(0,210,255,0.03))",
                            border: "2px solid rgba(0,210,255,0.25)",
                            boxShadow: "0 0 40px rgba(0,210,255,0.1), inset 0 0 30px rgba(0,210,255,0.05)",
                        }}
                        whileHover={{ rotateY: 180, transition: { duration: 0.6 } }}
                    >
                        <span className="text-lg font-black text-aero-blue">{item.year}</span>
                        {/* Pulsing ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-aero-blue/20"
                            animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        />
                    </motion.div>
                    {/* Connector line */}
                    {idx < policyTimeline.length - 1 && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-16 md:h-20 bg-gradient-to-b from-aero-blue/30 to-transparent" />
                    )}
                </div>

                {/* Content card */}
                <motion.div
                    whileHover={{ x: 8, transition: { duration: 0.25 } }}
                    className="flex-1 group rounded-2xl p-6 md:p-8 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                        border: "1px solid rgba(255,255,255,0.07)",
                    }}
                >
                    {/* Hover border glow */}
                    <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.25)" }}
                    />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                        {item.desc}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

/* ── Radar Advantage Card ────────────────────────────────── */
/* Cards with a sonar/radar ring pulse behind the icon      */

const RadarCard = ({ adv, idx }: { adv: (typeof keyAdvantages)[0]; idx: number }) => {
    const Icon = adv.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.5 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl p-8 overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #0e0e14 0%, #08080f 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.25), 0 16px 40px -12px rgba(0,210,255,0.15)" }}
            />

            {/* Radar pulse behind icon */}
            <div className="relative w-14 h-14 mb-6">
                {[0, 0.6, 1.2].map((delay, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-aero-blue/20"
                        animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay }}
                    />
                ))}
                <div
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center z-10"
                    style={{
                        background: "rgba(0,210,255,0.1)",
                        border: "1px solid rgba(0,210,255,0.25)",
                        boxShadow: "0 0 20px rgba(0,210,255,0.1)",
                    }}
                >
                    <Icon className="w-6 h-6 text-aero-blue" />
                </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-3">{adv.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{adv.desc}</p>
        </motion.div>
    );
};

/* ── Main Page ───────────────────────────────────────────── */

export const LowAltitudeEconomy = () => {
    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050508" }}>
            {/* ─── Hero with 3D altitude layers ─── */}
            <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#050508]" />

                {/* 3D Altitude layer visualization */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ perspective: "800px" }}
                >
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-2xl border"
                            style={{
                                width: `${70 - i * 8}%`,
                                height: "1px",
                                borderColor: `rgba(0,210,255,${0.08 - i * 0.015})`,
                                background: `linear-gradient(90deg, transparent, rgba(0,210,255,${0.06 - i * 0.01}), transparent)`,
                                transform: `rotateX(65deg) translateZ(${i * 40}px) translateY(${i * 30 - 40}px)`,
                            }}
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                        />
                    ))}
                    {/* Moving dots on layers — simulating air traffic */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={`dot-${i}`}
                            className="absolute w-1.5 h-1.5 rounded-full bg-aero-blue"
                            style={{
                                transform: `rotateX(65deg) translateZ(${i * 40}px) translateY(${i * 30 - 40}px)`,
                                boxShadow: "0 0 8px rgba(0,210,255,0.6)",
                            }}
                            animate={{ x: ["-200px", "200px"] }}
                            transition={{ duration: 4 + i, repeat: Infinity, repeatType: "reverse", delay: i * 1.2, ease: "linear" }}
                        />
                    ))}
                </div>

                {/* Hex grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(0,210,255,0.4) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/50 bg-aero-blue/10 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            National Strategic Initiative
                        </span>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            Low Altitude{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Economy</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            The next frontier of transportation — integrating autonomous aviation into the fabric of national
                            infrastructure to build a three-dimensional economy above ground level.
                        </p>
                    </motion.div>
                </div>

                {/* Altitude labels on right edge */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-12 text-[10px] uppercase tracking-[0.3em] text-gray-600 pointer-events-none">
                    {["300m", "200m", "100m", "Ground"].map((alt, i) => (
                        <motion.div
                            key={alt}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + i * 0.15 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-px bg-gray-700" />
                            <span>{alt}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Scroll hint */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
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

            {/* ─── Stats with 3D entrance ─── */}
            <section className="relative py-14 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-aero-blue/10 via-aero-purple/10 to-aero-blue/10" />
                <div className="absolute inset-0 bg-[#050508]/80 backdrop-blur-sm" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/30 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, rotateX: -40 }}
                                    whileInView={{ opacity: 1, rotateX: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                    className="text-center group"
                                    style={{ perspective: 600 }}
                                >
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-aero-blue/10 border border-aero-blue/20 text-aero-blue mb-3 group-hover:bg-aero-blue/20 transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-400 text-sm tracking-wide">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── Application Overview with corner brackets ─── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aero-blue/5 rounded-full blur-[200px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
                        style={{
                            background: "linear-gradient(160deg, rgba(0,210,255,0.06) 0%, rgba(168,85,247,0.04) 100%)",
                            border: "1px solid rgba(0,210,255,0.15)",
                            boxShadow: "0 0 60px rgba(0,210,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((cls, i) => (
                            <div key={i} className={`absolute w-6 h-6 ${cls} border-aero-blue/30`} />
                        ))}

                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-aero-blue/10 border border-aero-blue/25 mb-6">
                            <Globe2 className="w-7 h-7 text-aero-blue" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Application Overview</h2>
                        <div className="h-1 w-16 bg-gradient-to-r from-aero-blue to-aero-purple mx-auto rounded-full mb-8" />
                        <p className="text-lg text-gray-300 leading-loose">
                            Through the continuous development of the low altitude economy, it is possible to achieve the convenience
                            and intelligence of air transportation, improve transportation efficiency, reduce traffic congestion, reduce
                            energy consumption, and provide revolutionary new solutions for emergency rescue, logistics distribution,
                            and advanced industrial fields.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Ecosystem Pillars — 3D Prism Cards ─── */}
            <section className="py-24 relative overflow-hidden border-t border-white/5" style={{ background: "#030305" }}>
                {/* Isometric grid background */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage:
                            "linear-gradient(30deg, rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(150deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 35px",
                    }}
                />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-aero-purple/5 rounded-full blur-[200px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-medium">Core Sectors</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                            Ecosystem{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Pillars</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Four interconnected sectors driving the low-altitude economic revolution.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ecosystemPillars.map((pillar, idx) => (
                            <PrismCard key={idx} pillar={pillar} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Key Advantages — Radar Cards ─── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-aero-blue/5 rounded-full blur-[180px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-3 block font-medium">Strategic Value</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Key Advantages</h2>
                        <div className="h-px w-16 mt-4 rounded-full bg-gradient-to-r from-aero-blue to-transparent" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {keyAdvantages.map((adv, idx) => (
                            <RadarCard key={idx} adv={adv} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Policy Timeline — 3D Depth ─── */}
            <section className="py-24 relative overflow-hidden border-t border-white/5" style={{ background: "#030305" }}>
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-aero-purple/5 rounded-full blur-[200px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-medium">Development Roadmap</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                            Policy{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Timeline</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-12">
                        {policyTimeline.map((item, idx) => (
                            <DepthTimelineItem key={idx} item={item} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── White Paper ─── */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Scenario Application</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-aero-blue to-aero-purple mx-auto rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative rounded-3xl overflow-hidden"
                        style={{
                            background: "linear-gradient(160deg, #0a0a10 0%, #080810 100%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 32px 64px -16px rgba(0,0,0,0.6)",
                        }}
                    >
                        <div
                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.2)" }}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative h-80 lg:h-auto overflow-hidden flex items-center justify-center p-8">
                                <div className="absolute inset-0 bg-gradient-to-tr from-aero-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((cls, i) => (
                                    <div key={i} className={`absolute w-5 h-5 ${cls} border-aero-blue/20 opacity-30 group-hover:opacity-60 transition-opacity`} />
                                ))}
                                <motion.img
                                    src="https://www.htsdfp.com/UploadFiles/2024-02-28/beycmwcwnwhjfx6p.png"
                                    alt="Low Altitude Economic Industry White Paper"
                                    className="relative z-10 w-full max-w-sm object-contain drop-shadow-[0_10px_30px_rgba(0,210,255,0.15)]"
                                    whileHover={{ scale: 1.05, rotateY: 5 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                            </div>

                            <div className="p-10 md:p-14 flex flex-col justify-center relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-aero-blue/10 rounded-bl-full blur-2xl group-hover:bg-aero-purple/20 transition-colors" />

                                <div className="flex items-center text-aero-blue mb-4">
                                    <FileText className="w-6 h-6 mr-2" />
                                    <span className="text-sm font-semibold tracking-wider uppercase">Official Publication</span>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    Low Altitude Economic Industry White Paper
                                </h3>

                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    The low-altitude economic industrial system provides solutions around the radius of human life and
                                    work, integrating the results of various scientific and technological revolutions. It is characterized
                                    by advanced technology, high industrial level, huge scale, and a remarkable driving effect.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center w-fit px-6 py-3 rounded-full font-medium text-white border border-aero-blue/40 bg-aero-blue/10 hover:bg-aero-blue hover:text-black transition-all duration-300 group/btn shadow-[0_0_20px_rgba(0,210,255,0.15)] hover:shadow-[0_0_30px_rgba(0,210,255,0.3)]"
                                >
                                    Read White Paper
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-28 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#050508] to-[#060606]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/[0.06] rounded-full blur-[200px] pointer-events-none" />

                {/* Topographic contour lines */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aero-blue/40"
                            style={{ width: `${300 + i * 150}px`, height: `${200 + i * 100}px` }}
                        />
                    ))}
                </div>

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-blue/5 text-aero-blue text-xs uppercase tracking-[0.2em] mb-8">
                            <Globe2 className="w-3.5 h-3.5" />
                            Get Involved
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Shape the Future of
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                Low Altitude Aviation
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                            Unlock the trillion-yuan low-altitude economy and transform transportation infrastructure for the next generation.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
                                >
                                    <span className="flex items-center gap-2">
                                        Explore Products
                                        <ArrowRight className="w-5 h-5" />
                                    </span>
                                </motion.button>
                            </Link>
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
                </div>
            </section>
        </div>
    );
};
