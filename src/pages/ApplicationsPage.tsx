import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Package, ShieldAlert, Factory, TreePine } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { YouTubeGallery } from "../components/YouTubeGallery";

const scenarios = [
    {
        id: "civil-logistics",
        num: "01",
        title: "Civil Logistic",
        label: "Civil Logistic",
        desc: "Provides systematic solutions for typical operation scenarios such as trunk logistics, branch logistics and terminal logistics.",
        img: "/images/applications/civil-logistics.jpg",
        icon: Package,
        accent: "#00d2ff",
        stats: [
            { value: "3-Tier", label: "Network" },
            { value: "24/7", label: "Operation" },
            { value: "99.8%", label: "Delivery Rate" },
        ],
    },
    {
        id: "emergency-rescue",
        num: "02",
        title: "Emergency Rescue",
        label: "Emergency Rescue",
        desc: "Innovate the UAVs emergency rescue mode. Build an intelligent three-dimensional rescue system. Provide systematic solutions for different disaster scenarios.",
        img: "/images/applications/emergency-rescue.jpg",
        icon: ShieldAlert,
        accent: "#ef4444",
        stats: [
            { value: "<15min", label: "Response" },
            { value: "3D", label: "Mapping" },
            { value: "500km", label: "Coverage" },
        ],
    },
    {
        id: "industry-service",
        num: "03",
        title: "Industry Service",
        label: "Industry Service",
        desc: "A complete operational system for flight carrying. Provide customers with services such as operation, testing, and carrying of various models.",
        img: "/images/applications/industry-service.jpg",
        icon: Factory,
        accent: "#f59e0b",
        stats: [
            { value: "Full", label: "Lifecycle" },
            { value: "11+", label: "Models" },
            { value: "AOPA", label: "Certified" },
        ],
    },
    {
        id: "forest-fire-prevention",
        num: "04",
        title: "Forest & Grassland Fire Prevention",
        label: "Fire Prevention",
        desc: "Comprehensive forest and grassland fire prevention system including daily patrol, fire monitoring, fire scene reconnaissance, and emergency communications support.",
        img: "/images/applications/forest-fire-prevention.png",
        icon: TreePine,
        accent: "#22c55e",
        stats: [
            { value: "24/7", label: "Patrol" },
            { value: "Real-time", label: "Monitoring" },
            { value: "Emergency", label: "Comms" },
        ],
    },
];

/* ── Immersive Scenario Section with scroll-driven parallax ── */
const ImmersiveScenario = ({ scenario, index }: { scenario: (typeof scenarios)[0]; index: number }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
    const Icon = scenario.icon;
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={sectionRef}
            style={{ opacity }}
            className="relative"
        >
            {/* Ghost number */}
            <div
                className="absolute select-none pointer-events-none font-black leading-none z-0"
                style={{
                    fontSize: "clamp(180px, 25vw, 350px)",
                    color: `${scenario.accent}06`,
                    top: "-0.15em",
                    [isEven ? "left" : "right"]: "-0.05em",
                }}
            >
                {scenario.num}
            </div>

            <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? "direction-rtl" : ""}`}>
                {/* Image */}
                <motion.div
                    className={`relative ${!isEven ? "lg:order-2" : ""}`}
                    style={{ y: imgY }}
                >
                    <div className="relative group" style={{ perspective: "1200px" }}>
                        {/* Ambient glow */}
                        <div
                            className="absolute -inset-8 rounded-[3rem] opacity-30 group-hover:opacity-60 transition-opacity duration-700 blur-[60px] pointer-events-none"
                            style={{ background: scenario.accent }}
                        />

                        <motion.div
                            whileHover={{ rotateY: isEven ? 5 : -5, rotateX: -3, scale: 1.02 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="relative rounded-3xl overflow-hidden"
                        >
                            {/* Border gradient */}
                            <div
                                className="absolute inset-0 rounded-3xl z-10 pointer-events-none"
                                style={{
                                    border: `1px solid ${scenario.accent}25`,
                                    boxShadow: `0 40px 80px -20px rgba(0,0,0,0.8), 0 0 60px -10px ${scenario.accent}20`,
                                }}
                            />

                            {/* Image */}
                            <img
                                src={scenario.img}
                                alt={scenario.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-[400px] lg:h-[500px] object-cover"
                            />

                            {/* Overlay gradient */}
                            <div
                                className="absolute inset-0"
                                style={{ background: `linear-gradient(to top, ${scenario.accent}15, transparent 50%)` }}
                            />

                            {/* Corner data points */}
                            <div className="absolute top-5 left-5 flex items-center gap-2 z-20">
                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: scenario.accent }} />
                                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: scenario.accent }}>
                                    SCENARIO {scenario.num}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    className={`flex flex-col gap-8 ${!isEven ? "lg:order-1 lg:text-right lg:items-end" : ""}`}
                    style={{ y: textY }}
                >
                    <motion.div
                        initial={{ x: isEven ? -40 : 40 }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        {/* Label */}
                        <span
                            className="text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full inline-block"
                            style={{ color: scenario.accent, background: `${scenario.accent}10`, border: `1px solid ${scenario.accent}25` }}
                        >
                            {scenario.label}
                        </span>

                        {/* Title with icon */}
                        <div className={`flex items-center gap-4 ${!isEven ? "flex-row-reverse" : ""}`}>
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                                style={{
                                    background: `linear-gradient(135deg, ${scenario.accent}20, transparent)`,
                                    border: `1px solid ${scenario.accent}30`,
                                    boxShadow: `0 0 40px ${scenario.accent}15`,
                                }}
                            >
                                <Icon className="w-8 h-8" style={{ color: scenario.accent }} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">{scenario.title}</h2>
                        </div>

                        {/* Accent line */}
                        <div
                            className={`h-[2px] w-20 rounded-full ${!isEven ? "ml-auto" : ""}`}
                            style={{ background: `linear-gradient(to right, ${scenario.accent}, transparent)` }}
                        />

                        {/* Description */}
                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg">{scenario.desc}</p>
                    </motion.div>

                    {/* Stats — 3D layered */}
                    <div className={`grid grid-cols-3 gap-3 ${!isEven ? "direction-ltr" : ""}`}>
                        {scenario.stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, rotateX: 15 }}
                                whileInView={{ y: 0, rotateX: 0 }}
                                viewport={{ once: true, margin: "200px 0px" }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="relative rounded-xl p-4 text-center overflow-hidden group/stat"
                                style={{ perspective: "600px" }}
                            >
                                <div
                                    className="absolute inset-0 rounded-xl"
                                    style={{ background: "#181826", border: `1px solid ${scenario.accent}15` }}
                                />
                                <div
                                    className="absolute bottom-0 inset-x-0 h-1/2 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(to top, ${scenario.accent}10, transparent)` }}
                                />
                                <div className="relative z-10">
                                    <div className="text-2xl font-black mb-1" style={{ color: scenario.accent }}>{stat.value}</div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link to={`/applications/${scenario.id}`}>
                        <motion.button
                            whileHover={{ x: isEven ? 5 : -5 }}
                            className={`group w-fit flex items-center gap-3 text-sm font-bold uppercase tracking-widest ${!isEven ? "flex-row-reverse" : ""}`}
                            style={{ color: scenario.accent }}
                        >
                            <span className="relative">
                                Explore Case Study
                                <span
                                    className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                                    style={{ background: scenario.accent }}
                                />
                            </span>
                            <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${!isEven ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export const ApplicationsPage = () => {
    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            {/* ── Hero ── */}
            <section className="relative h-[65vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/banners/applications-hero.jpg')",
                        filter: "brightness(0.25) saturate(1.4)",
                    }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #161622 10%, rgba(22,22,34,0.7) 50%, transparent 100%)" }} />

                {/* Animated ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                    <motion.div
                        className="w-[500px] h-[500px] rounded-full border border-aero-blue/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-aero-blue/40 rounded-full" />
                    </motion.div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                    <motion.div
                        className="w-[350px] h-[350px] rounded-full border border-aero-purple/10"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-aero-purple/40 rounded-full" />
                    </motion.div>
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ y: 30 }} animate={{ y: 0 }} transition={{ duration: 0.9 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-card/80 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            Global Use Cases
                        </span>
                        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none mb-4">
                            Application{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Scenarios</span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-lg mx-auto mt-4">
                            From civil logistics to emergency response — built for every critical mission.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                   
                   
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

            {/* ── Immersive Scenarios ── */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="space-y-48">
                        {scenarios.map((scenario, index) => (
                            <ImmersiveScenario key={scenario.num} scenario={scenario} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Video Gallery ── */}
            <YouTubeGallery />

            {/* ── CTA ── */}
            <section className="py-32 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0">
                    {/* Cross grid */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aero-blue/10 to-transparent" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aero-blue/10 to-transparent" />
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-aero-blue/[0.05] rounded-full blur-[200px] pointer-events-none" />

                <motion.div
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "200px 0px" }}
                    className="relative z-10 text-center max-w-3xl mx-auto px-6"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Have a Mission
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">In Mind?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                        Our specialists design UAV solutions tailored to your operational requirements.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                Discuss Your Scenario
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-4 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300"
                            >
                                View All Products
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ApplicationsPage;
