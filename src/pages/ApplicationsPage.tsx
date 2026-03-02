import { motion } from "framer-motion";
import { ArrowRight, Package, ShieldAlert, Factory, ChevronRight } from "lucide-react";
import { useRef } from "react";

const scenarios = [
    {
        num: "01",
        title: "Civil Logistics",
        label: "Supply Chain Automation",
        desc: "Revolutionizing the supply chain with autonomous precision. We provide systematic solutions for typical operation scenarios such as trunk logistics, branch logistics, and terminal logistics. Our systems ensure faster, safer, and more cost-effective delivery networks.",
        img: "https://www.htsdfp.com/UploadFiles/2024-10-10/tsfdemhrijza6ejq.png",
        icon: Package,
        accent: "#00d2ff",
        gradientFrom: "#00d2ff",
        gradientTo: "#0ea5e9",
        glowColor: "rgba(0,210,255,0.15)",
        stats: [
            { value: "3×", label: "Faster Delivery" },
            { value: "60%", label: "Cost Reduction" },
            { value: "24/7", label: "Operation" },
        ],
    },
    {
        num: "02",
        title: "Emergency Rescue",
        label: "Disaster Response",
        desc: "Innovating the UAV emergency rescue mode. We build an intelligent, three-dimensional rescue system that provides rapid, systematic solutions for disaster scenarios where human access is dangerous or impossible. Time saved is lives saved.",
        img: "https://www.htsdfp.com/UploadFiles/2024-05-15/wxzhgujhcrs7dwzb.png",
        icon: ShieldAlert,
        accent: "#f97316",
        gradientFrom: "#f97316",
        gradientTo: "#ef4444",
        glowColor: "rgba(249,115,22,0.15)",
        stats: [
            { value: "<5min", label: "Deploy Time" },
            { value: "100km", label: "Response Radius" },
            { value: "0°C", label: "All Weather" },
        ],
    },
    {
        num: "03",
        title: "Industry Service",
        label: "Enterprise Operations",
        desc: "A complete, end-to-end operational system for flight carrying. We provide enterprise customers with comprehensive services such as operation, rigorous testing, and the carrying of various specialized models tailored to specific industrial needs.",
        img: "https://www.htsdfp.com/UploadFiles/2024-05-15/g8shx7utz55qhupr.png",
        icon: Factory,
        accent: "#a855f7",
        gradientFrom: "#a855f7",
        gradientTo: "#6366f1",
        glowColor: "rgba(168,85,247,0.15)",
        stats: [
            { value: "500+", label: "Enterprise Clients" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "ISO", label: "Certified" },
        ],
    },
];

const ScenarioCard = ({ scenario, index }: { scenario: (typeof scenarios)[0]; index: number }) => {
    const isEven = index % 2 === 0;
    const Icon = scenario.icon;
    const ref = useRef(null);

    return (
        <div ref={ref} className="relative">
            {/* Ghost number watermark */}
            <div
                className="absolute select-none pointer-events-none font-black leading-none z-0"
                style={{
                    fontSize: "clamp(160px, 22vw, 300px)",
                    color: "rgba(255,255,255,0.025)",
                    top: "-0.1em",
                    [isEven ? "left" : "right"]: "-0.05em",
                    fontVariantNumeric: "tabular-nums",
                }}
            >
                {scenario.num}
            </div>

            <div className={`relative z-10 flex flex-col lg:flex-row items-center gap-12 xl:gap-20 ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                {/* ── Text Side ── */}
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -48 : 48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    className="flex-1 flex flex-col gap-7"
                >
                    {/* label pill + number */}
                    <div className="flex items-center gap-3">
                        <span
                            className="text-[10px] font-black tracking-[0.28em] uppercase px-3 py-1.5 rounded-full"
                            style={{
                                color: scenario.accent,
                                background: `${scenario.accent}12`,
                                border: `1px solid ${scenario.accent}28`,
                            }}
                        >
                            {scenario.label}
                        </span>
                        <span className="text-xs font-bold text-white/20 tracking-widest">{scenario.num}</span>
                    </div>

                    {/* icon + title */}
                    <div className="flex items-start gap-5">
                        <div
                            className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, ${scenario.gradientFrom}22, ${scenario.gradientTo}10)`,
                                border: `1px solid ${scenario.accent}30`,
                                boxShadow: `0 0 24px ${scenario.accent}18`,
                            }}
                        >
                            <Icon size={24} style={{ color: scenario.accent }} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">{scenario.title}</h2>
                    </div>

                    {/* gradient rule */}
                    <div className="h-px w-24 rounded-full" style={{ background: `linear-gradient(to right, ${scenario.accent}, transparent)` }} />

                    {/* description */}
                    <p className="text-gray-400 text-base leading-relaxed max-w-lg">{scenario.desc}</p>

                    {/* stats row */}
                    <div className="grid grid-cols-3 gap-3">
                        {scenario.stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.08 }}
                                className="rounded-xl p-3 text-center"
                                style={{
                                    background: "rgba(255,255,255,0.025)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                }}
                            >
                                <div className="text-xl font-black" style={{ color: scenario.accent }}>
                                    {stat.value}
                                </div>
                                <div className="text-[10px] text-gray-600 uppercase tracking-widest mt-0.5 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        className="group w-fit flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-all duration-200"
                        style={{ color: scenario.accent }}
                    >
                        <span className="relative">
                            Explore Case Study
                            <span
                                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 rounded-full"
                                style={{ background: scenario.accent }}
                            />
                        </span>
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{
                                border: `1px solid ${scenario.accent}40`,
                                background: `${scenario.accent}10`,
                            }}
                        >
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </button>
                </motion.div>

                {/* ── Image Side ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.93 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="flex-1 relative group w-full"
                >
                    {/* outer glow */}
                    <div
                        className="absolute -inset-4 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 50% 50%, ${scenario.glowColor} 0%, transparent 70%)` }}
                    />

                    {/* card shell */}
                    <div
                        className="relative rounded-3xl overflow-hidden"
                        style={{
                            background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: `0 32px 64px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`,
                        }}
                    >
                        {/* inner glow always present, brighter on hover */}
                        <div
                            className="absolute inset-0 opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                            style={{
                                background: `radial-gradient(ellipse at 50% 90%, ${scenario.glowColor} 0%, transparent 60%)`,
                            }}
                        />

                        {/* corner brackets */}
                        {[
                            "top-3 left-3 border-t border-l",
                            "top-3 right-3 border-t border-r",
                            "bottom-3 left-3 border-b border-l",
                            "bottom-3 right-3 border-b border-r",
                        ].map((cls, i) => (
                            <div
                                key={i}
                                className={`absolute w-5 h-5 ${cls} opacity-20 group-hover:opacity-50 transition-opacity duration-500`}
                                style={{ borderColor: scenario.accent }}
                            />
                        ))}

                        {/* image */}
                        <div className="p-8">
                            <motion.img
                                src={scenario.img}
                                alt={scenario.title}
                                className="w-full h-auto object-contain rounded-xl drop-shadow-2xl"
                                whileHover={{ scale: 1.04, y: -4 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                        </div>

                        {/* bottom bar */}
                        <div
                            className="px-6 py-3 flex items-center justify-between"
                            style={{
                                background: "rgba(0,0,0,0.3)",
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: scenario.accent }}>
                                {scenario.title}
                            </span>
                            <div className="flex gap-1">
                                {[0, 1, 2].map((d) => (
                                    <div
                                        key={d}
                                        className="w-1 h-1 rounded-full"
                                        style={{ background: d === 0 ? scenario.accent : "rgba(255,255,255,0.15)" }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export const ApplicationsPage = () => {
    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050508" }}>
            {/* ── Hero ── */}
            <section className="relative h-[55vh] min-h-100 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://www.htsdfp.com/UploadFiles/banner/ban_2.jpg')",
                        filter: "brightness(0.3) saturate(1.3)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #050508 8%, rgba(5,5,8,0.3) 50%, transparent 100%)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,210,255,0.1) 0%, transparent 65%)" }}
                />
                {/* grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                        backgroundSize: "52px 52px",
                    }}
                />

                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
                        <span
                            className="inline-block text-xs font-black tracking-[0.3em] uppercase mb-5 px-4 py-1.5 rounded-full"
                            style={{ color: "#00d2ff", background: "rgba(0,210,255,0.08)", border: "1px solid rgba(0,210,255,0.2)" }}
                        >
                            Global Use Cases
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
                            Application{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #00d2ff 0%, #a855f7 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Scenarios
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-md mx-auto mt-3">
                            From civil logistics to emergency response — built for every critical mission.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.6 }}
                                className="w-1 h-2 rounded-full bg-white/35"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Breadcrumb ── */}
            <div
                className="sticky top-18 z-40 border-b"
                style={{
                    background: "rgba(5,5,8,0.85)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.06)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center gap-2 text-sm text-gray-500">
                    <span className="hover:text-white cursor-pointer transition-colors">Home</span>
                    <ChevronRight size={14} className="opacity-30" />
                    <span className="text-white font-semibold">Application Scenarios</span>
                    <div className="ml-auto flex gap-6">
                        {scenarios.map((s) => (
                            <button
                                key={s.num}
                                onClick={() => {
                                    const el = document.getElementById(`scenario-${s.num}`);
                                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                                }}
                                className="text-xs font-semibold tracking-wider uppercase transition-colors hover:text-white"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Scenarios ── */}
            <section className="py-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="space-y-40">
                        {scenarios.map((scenario, index) => (
                            <div key={scenario.num} id={`scenario-${scenario.num}`} className="scroll-mt-32">
                                <ScenarioCard scenario={scenario} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Footer ── */}
            <section className="py-24 relative overflow-hidden border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,210,255,0.07) 0%, transparent 60%)" }}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 text-center max-w-2xl mx-auto px-6"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Have a mission in mind?</h2>
                    <p className="text-gray-500 mb-8">
                        Our specialists are ready to design a UAV solution tailored to your operational requirements.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <button
                            className="px-7 py-3 rounded-xl text-sm font-black text-black transition-all hover:scale-[1.03] active:scale-[0.98]"
                            style={{
                                background: "linear-gradient(135deg, #00d2ff, #a855f7)",
                                boxShadow: "0 0 32px rgba(0,210,255,0.22)",
                            }}
                        >
                            Discuss Your Scenario
                        </button>
                        <button
                            className="px-7 py-3 rounded-xl text-sm font-bold text-white transition-all hover:border-white/30"
                            style={{ border: "1px solid rgba(255,255,255,0.11)", background: "rgba(255,255,255,0.04)" }}
                        >
                            View All Products
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ApplicationsPage;
