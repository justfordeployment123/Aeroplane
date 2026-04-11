import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Calendar, Users, GraduationCap, TrendingUp, ShieldCheck, Award, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

// Non-translatable config: icons, colors — stays in TS
const featureConfig = [
    { icon: Calendar, accent: "#00d2ff" },
    { icon: Users, accent: "#a855f7" },
    { icon: GraduationCap, accent: "#10b981" },
    { icon: TrendingUp, accent: "#f97316" },
];

const statsConfig = [{ icon: Award }, { icon: ShieldCheck }, { icon: CheckCircle2 }, { icon: Clock }];

const processColors = ["#00d2ff", "#a855f7", "#10b981", "#f97316"];

const panelConfig = [
    { accent: "#00d2ff", img: "/images/training/service-process.jpg" },
    { accent: "#a855f7", img: "/images/training/certification.jpg" },
];

const floatingBadges = [
    { x: "12%", y: "35%", text: "AOPA", delay: 0 },
    { x: "85%", y: "30%", text: "88-90%", delay: 1 },
    { x: "78%", y: "65%", text: "500+", delay: 2 },
];

interface StatItem {
    value: string;
    label: string;
}
interface StepItem {
    step: string;
    title: string;
    desc: string;
}
interface FeatureItem {
    title: string;
    desc: string;
}
interface PanelItem {
    title: string;
    sub: string;
}

/* ── 3D Feature Card ── */
const FeatureCard3D = ({ feature, config, idx }: { feature: FeatureItem; config: (typeof featureConfig)[number]; idx: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
    const Icon = config.icon;

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            initial={{ y: 50, rotateX: 10 }}
            whileInView={{ y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ delay: idx * 0.12, duration: 0.7 }}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={() => {
                    mouseX.set(0);
                    mouseY.set(0);
                }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative h-full"
            >
                <div
                    className="relative rounded-3xl overflow-hidden h-full"
                    style={{ background: "#181826", border: `1px solid ${config.accent}15` }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${config.accent}, transparent)` }}
                    />
                    <div
                        className="absolute top-4 right-5 text-[80px] font-black leading-none pointer-events-none select-none"
                        style={{ color: `${config.accent}06`, transform: "translateZ(-20px)" }}
                    >
                        {String(idx + 1).padStart(2, "0")}
                    </div>
                    <motion.div className="relative p-8" style={{ transform: "translateZ(20px)" }}>
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                            style={{
                                background: `linear-gradient(135deg, ${config.accent}20, ${config.accent}05)`,
                                border: `1px solid ${config.accent}30`,
                                boxShadow: `0 0 30px ${config.accent}15`,
                            }}
                        >
                            <Icon className="w-7 h-7" style={{ color: config.accent }} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{feature.desc}</p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const TrainingCenter = () => {
    const { t } = useTranslation("training");

    const stats = t("stats", { returnObjects: true }) as StatItem[];
    const steps = t("process.steps", { returnObjects: true }) as StepItem[];
    const features = t("features.items", { returnObjects: true }) as FeatureItem[];
    const panels = t("panels", { returnObjects: true }) as PanelItem[];

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            {/* ── Hero ── */}
            <section className="relative h-[65vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/banners/training-hero.png')", filter: "brightness(0.22) saturate(1.4)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #161622 10%, rgba(22,22,34,0.7) 55%, transparent 100%)" }}
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-aero-blue/[0.06] z-[1]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-aero-purple/[0.06] z-[1]" />

                <div className="absolute inset-0 z-[2] hidden lg:block">
                    {floatingBadges.map((badge, i) => (
                        <motion.div
                            key={i}
                            className="absolute px-3 py-1 rounded-full border border-aero-blue/20 bg-aero-card/80 backdrop-blur-sm text-[10px] font-mono text-aero-blue/60"
                            style={{ left: badge.x, top: badge.y }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: badge.delay }}
                        >
                            {badge.text}
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ y: 30 }} animate={{ y: 0 }} transition={{ duration: 0.85 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-card/80 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            {t("hero.badge")}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none mb-4">
                            {t("hero.title").split(" ")[0]}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t("hero.title").split(" ").slice(1).join(" ")}
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-3">{t("hero.subtitle")}</p>
                    </motion.div>
                </div>

                <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" transition={{ delay: 1.5 }}>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{t("hero.scroll")}</span>
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

            {/* ── Stats ── */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-aero-blue/5 via-transparent to-aero-purple/5" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/30 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => {
                            const Icon = statsConfig[i].icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.8, rotateY: -20 }}
                                    whileInView={{ scale: 1, rotateY: 0 }}
                                    viewport={{ once: true, margin: "200px 0px" }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="text-center group"
                                    style={{ perspective: "600px" }}
                                >
                                    <motion.div
                                        whileHover={{ rotateY: 10, scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative rounded-2xl p-6"
                                        style={{
                                            background: "rgba(255,255,255,0.02)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        <Icon size={20} className="mx-auto mb-3 text-aero-blue/60 group-hover:text-aero-blue transition-colors" />
                                        <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                                        <div className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">{stat.label}</div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Intro Block ── */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ y: 30 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
                        style={{
                            background: "linear-gradient(160deg, rgba(0,210,255,0.06) 0%, rgba(168,85,247,0.04) 100%)",
                            border: "1px solid rgba(0,210,255,0.12)",
                            boxShadow: "0 0 80px rgba(0,210,255,0.05)",
                        }}
                    >
                        {[
                            "top-5 left-5 border-t-2 border-l-2",
                            "top-5 right-5 border-t-2 border-r-2",
                            "bottom-5 left-5 border-b-2 border-l-2",
                            "bottom-5 right-5 border-b-2 border-r-2",
                        ].map((cls, i) => (
                            <div key={i} className={`absolute w-6 h-6 ${cls} border-aero-blue/30`} />
                        ))}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-8 bg-aero-blue/10 border border-aero-blue/25">
                            <ShieldCheck size={30} className="text-aero-blue" />
                        </div>
                        {/* Split on <highlight> tag for styled span */}
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            {t("intro.body").split("<highlight>")[0]}
                            <span className="text-aero-blue font-semibold">{t("intro.body").split("<highlight>")[1]?.split("</highlight>")[0]}</span>
                            {t("intro.body").split("</highlight>")[1]}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Process Steps ── */}
            <section className="py-24 relative overflow-hidden" style={{ background: "#111119" }}>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-gradient-to-r from-aero-blue to-transparent" />
                            <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("process.tag")}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            {t("process.title")}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t("process.titleHighlight")}
                            </span>
                        </h2>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d2ff20] via-[#a855f720] via-[#10b98120] to-[#f9731620] hidden lg:block -translate-y-1/2" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 40, rotateX: 15 }}
                                    whileInView={{ y: 0, rotateX: 0 }}
                                    viewport={{ once: true, margin: "200px 0px" }}
                                    transition={{ delay: i * 0.15, duration: 0.6 }}
                                    style={{ perspective: "800px" }}
                                >
                                    <motion.div
                                        whileHover={{ y: -8, rotateY: 5, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ transformStyle: "preserve-3d" }}
                                        className="relative rounded-2xl p-7 h-full"
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{ background: "#1c1c2a", border: `1px solid ${processColors[i]}15` }}
                                        />
                                        <div className="relative z-10">
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-lg font-black"
                                                style={{
                                                    background: `${processColors[i]}15`,
                                                    border: `2px solid ${processColors[i]}40`,
                                                    color: processColors[i],
                                                    boxShadow: `0 0 20px ${processColors[i]}20`,
                                                }}
                                            >
                                                {step.step}
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className="hidden lg:block absolute top-1/2 -right-4 z-20">
                                                <div className="w-2 h-2 border-t border-r border-white/10 rotate-45" />
                                            </div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Visual Panels ── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {panels.map((panel, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 40 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "200px 0px" }}
                            transition={{ delay: i * 0.15, duration: 0.7 }}
                            className="group"
                            style={{ perspective: "1000px" }}
                        >
                            <motion.div
                                whileHover={{ rotateY: i === 0 ? 3 : -3, rotateX: -2, scale: 1.01 }}
                                transition={{ duration: 0.4 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div className="flex items-center gap-4 mb-5">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: panelConfig[i].accent }}>
                                        {panel.sub}
                                    </p>
                                    <div
                                        className="h-px flex-1"
                                        style={{ background: `linear-gradient(to right, ${panelConfig[i].accent}40, transparent)` }}
                                    />
                                </div>
                                <div
                                    className="relative rounded-3xl overflow-hidden"
                                    style={{
                                        border: `1px solid ${panelConfig[i].accent}15`,
                                        boxShadow: `0 30px 60px -15px rgba(0,0,0,0.6), 0 0 40px -10px ${panelConfig[i].accent}10`,
                                    }}
                                >
                                    <div
                                        className="absolute top-0 inset-x-0 h-[1px]"
                                        style={{ background: `linear-gradient(90deg, transparent, ${panelConfig[i].accent}40, transparent)` }}
                                    />
                                    <div className="p-6 bg-[#1c1c2a]">
                                        <h2 className="text-2xl font-bold text-white mb-4">{panel.title}</h2>
                                        <img
                                            src={panelConfig[i].img}
                                            alt={panel.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-auto rounded-xl"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Course Features ── */}
            <section className="py-24 relative overflow-hidden" style={{ background: "#111119" }}>
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,210,255,0.5) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-gradient-to-r from-aero-blue to-transparent" />
                            <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("features.tag")}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            {t("features.title")}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t("features.titleHighlight")}
                            </span>
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <FeatureCard3D key={idx} feature={feature} config={featureConfig[idx]} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-32 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0">
                    {[300, 500, 700].map((size, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 rounded-full border border-aero-blue/[0.04]"
                            style={{ width: size, height: size, transform: "translate(-50%, -50%)" }}
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i * 0.8 }}
                        />
                    ))}
                </div>
                <motion.div
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "200px 0px" }}
                    className="relative z-10 text-center max-w-3xl mx-auto px-6"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-8 bg-aero-blue/10 border border-aero-blue/25">
                        <GraduationCap size={30} className="text-aero-blue" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {t("cta.title")}
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("cta.titleHighlight")}
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
                                {t("cta.enroll")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-4 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300"
                            >
                                {t("cta.learnAopa")}
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default TrainingCenter;
