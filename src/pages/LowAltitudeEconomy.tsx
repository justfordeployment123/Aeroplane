import { useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
    FileText, ArrowRight, Globe2, TrendingUp, Truck, Building2,
    Plane, Shield, Zap, Network, Target, BarChart3
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* ── Types ────────────────────────────────────────────────── */
interface Pillar {
    icon: LucideIcon;
    title: string;
    desc: string;
    accent: string;
    stat: string;
    statLabel: string;
    backDetails: string[];
}

interface TimelineItemType {
    year: string;
    title: string;
    desc: string;
}

interface Advantage {
    icon: LucideIcon;
    title: string;
    desc: string;
}

/* ── 3D Prism Card ───────────────────────────────────────── */
const PrismCard = ({ pillar, idx }: { pillar: Pillar; idx: number }) => {
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
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ delay: idx * 0.12, duration: 0.6 }}
            style={{ rotateX: rotX, rotateY: rotY, perspective: 800, transformStyle: "preserve-3d" } as React.CSSProperties}
            className="group relative rounded-3xl cursor-default"
        >
            <div
                className="relative rounded-3xl p-8 overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #202030 0%, #111119 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transformStyle: "preserve-3d",
                }}
            >
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${pillar.accent}40, 0 20px 60px -15px ${pillar.accent}25` }}
                />
                <div
                    className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${pillar.accent}, transparent)` }}
                />

                <div
                    className="absolute top-2 right-4 text-[90px] font-black leading-none pointer-events-none text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="flex items-start gap-5 pb-14" style={{ transform: "translateZ(30px)" }}>
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

                <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl px-8 pb-6 pt-2" style={{ transform: "translateZ(40px)" }}>
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
                </div>
            </div>
        </motion.div>
    );
};

/* ── 3D Depth Timeline ───────────────────────────────────── */
const DepthTimelineItem = ({ item, idx, isLast }: { item: TimelineItemType; idx: number; isLast: boolean }) => {
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
                        <motion.div
                            className="absolute inset-0 rounded-full border border-aero-blue/20"
                            animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        />
                    </motion.div>
                    {!isLast && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-16 md:h-20 bg-gradient-to-b from-aero-blue/30 to-transparent" />
                    )}
                </div>

                <motion.div
                    whileHover={{ x: 8, transition: { duration: 0.25 } }}
                    className="flex-1 group rounded-2xl p-6 md:p-8 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                        border: "1px solid rgba(255,255,255,0.07)",
                    }}
                >
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
const RadarCard = ({ adv, idx }: { adv: Advantage; idx: number }) => {
    const Icon = adv.icon;
    return (
        <motion.div
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ delay: idx * 0.12, duration: 0.5 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl p-8 overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #202030 0%, #1c1c2a 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.25), 0 16px 40px -12px rgba(0,210,255,0.15)" }}
            />

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
    const { t } = useTranslation('economy');

    // Fetch and validate array translations
    const rawAltitudes = t('hero.altitudes', { returnObjects: true });
    const altitudes = Array.isArray(rawAltitudes) ? rawAltitudes : [];

    const rawStats = t('statsData', { returnObjects: true });
    const statsData = Array.isArray(rawStats) ? rawStats : [];

    // Combine static icons/accents with dynamic text
    const ecosystemPillars: Pillar[] = useMemo(() => {
        const rawItems = t('pillars.items', { returnObjects: true });
        const items = Array.isArray(rawItems) ? rawItems : [];
        const icons = [Truck, Shield, Building2, Globe2];
        const accents = ["#00d2ff", "#f97316", "#a855f7", "#10b981"];
        const statsTags = ["3-Tier", "3D", "11+", "24/7"];

        return items.map((item: any, idx: number) => ({
            ...item,
            icon: icons[idx % icons.length],
            accent: accents[idx % accents.length],
            stat: statsTags[idx % statsTags.length],
            backDetails: Array.isArray(item.backDetails) ? item.backDetails : [],
        }));
    }, [t]);

    const stats = useMemo(() => {
        const icons = [TrendingUp, Plane, Building2, Network];
        return statsData.map((stat: any, idx: number) => ({
            ...stat,
            icon: icons[idx % icons.length],
        }));
    }, [statsData]);

    const keyAdvantages: Advantage[] = useMemo(() => {
        const rawItems = t('advantages.items', { returnObjects: true });
        const items = Array.isArray(rawItems) ? rawItems : [];
        const icons = [Zap, Target, BarChart3];
        return items.map((item: any, idx: number) => ({
            ...item,
            icon: icons[idx % icons.length],
        }));
    }, [t]);

    const policyTimeline: TimelineItemType[] = useMemo(() => {
        const rawItems = t('timeline.items', { returnObjects: true });
        return Array.isArray(rawItems) ? rawItems : [];
    }, [t]);


    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            {/* ─── Hero ─── */}
            <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#161622] to-[#161622]" />

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

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(0,210,255,0.4) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.div initial={{ y: 28 }} animate={{ y: 0 }} transition={{ duration: 0.85 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/50 bg-aero-blue/10 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            {t('hero.badge')}
                        </span>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            {t('hero.title1')}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t('hero.title2')}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            {t('hero.subtitle')}
                        </p>
                    </motion.div>
                </div>

                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-12 text-[10px] uppercase tracking-[0.3em] text-gray-600 pointer-events-none">
                    {altitudes.map((alt: string, i: number) => (
                        <motion.div
                            key={alt}
                            initial={{ x: 20 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 1 + i * 0.15 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-px bg-gray-700" />
                            <span>{alt}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{t('hero.scroll')}</span>
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

            {/* ─── Stats ─── */}
            <section className="relative py-14 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-aero-blue/10 via-aero-purple/10 to-aero-blue/10" />
                <div className="absolute inset-0 bg-[#161622]/80 backdrop-blur-sm" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/30 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ rotateX: -40 }}
                                    whileInView={{ rotateX: 0 }}
                                    viewport={{ once: true, margin: "200px 0px" }}
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

            {/* ─── Application Overview ─── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aero-blue/5 rounded-full blur-[200px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ y: 30 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
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

                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('overview.title')}</h2>
                        <div className="h-1 w-16 bg-gradient-to-r from-aero-blue to-aero-purple mx-auto rounded-full mb-8" />
                        <p className="text-lg text-gray-300 leading-loose">
                            {t('overview.desc')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Ecosystem Pillars ─── */}
            <section className="py-24 relative overflow-hidden border-t border-white/5" style={{ background: "#111119" }}>
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: "linear-gradient(30deg, rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(150deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 35px",
                    }}
                />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-aero-purple/5 rounded-full blur-[200px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ y: 30 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="text-center mb-20"
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-medium">{t('pillars.tag')}</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                            {t('pillars.title1')}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t('pillars.title2')}</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            {t('pillars.subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ecosystemPillars.map((pillar, idx) => (
                            <PrismCard key={idx} pillar={pillar} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Key Advantages ─── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-aero-blue/5 rounded-full blur-[180px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="mb-16"
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-3 block font-medium">{t('advantages.tag')}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{t('advantages.title')}</h2>
                        <div className="h-px w-16 mt-4 rounded-full bg-gradient-to-r from-aero-blue to-transparent" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {keyAdvantages.map((adv, idx) => (
                            <RadarCard key={idx} adv={adv} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Policy Timeline ─── */}
            <section className="py-24 relative overflow-hidden border-t border-white/5" style={{ background: "#111119" }}>
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-aero-purple/5 rounded-full blur-[200px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ y: 30 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="text-center mb-20"
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-medium">{t('timeline.tag')}</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                            {t('timeline.title1')}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t('timeline.title2')}</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-12">
                        {policyTimeline.map((item, idx) => (
                            <DepthTimelineItem key={idx} item={item} idx={idx} isLast={idx === policyTimeline.length - 1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── White Paper ─── */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">{t('whitepaper.tag')}</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-aero-blue to-aero-purple mx-auto rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ y: 40 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        transition={{ duration: 0.6 }}
                        className="group relative rounded-3xl overflow-hidden"
                        style={{
                            background: "linear-gradient(160deg, #181826 0%, #111119 100%)",
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
                                    src="/images/economy/whitepaper.png"
                                    alt={t('whitepaper.title')}
                                    className="relative z-10 w-full max-w-sm object-contain drop-shadow-[0_10px_30px_rgba(0,210,255,0.15)]"
                                    whileHover={{ scale: 1.05, rotateY: 5 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                            </div>

                            <div className="p-10 md:p-14 flex flex-col justify-center relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-aero-blue/10 rounded-bl-full blur-2xl group-hover:bg-aero-purple/20 transition-colors" />

                                <div className="flex items-center text-aero-blue mb-4">
                                    <FileText className="w-6 h-6 mr-2" />
                                    <span className="text-sm font-semibold tracking-wider uppercase">{t('whitepaper.badge')}</span>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    {t('whitepaper.title')}
                                </h3>

                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    {t('whitepaper.desc')}
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center w-fit px-6 py-3 rounded-full font-medium text-white border border-aero-blue/40 bg-aero-blue/10 hover:bg-aero-blue hover:text-black transition-all duration-300 group/btn shadow-[0_0_20px_rgba(0,210,255,0.15)] hover:shadow-[0_0_30px_rgba(0,210,255,0.3)]"
                                >
                                    {t('whitepaper.btnRead')}
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-32 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-[#161622] via-[#161622] to-[#161622]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/[0.06] rounded-full blur-[200px] pointer-events-none" />

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
                    <motion.div initial={{ y: 30 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-blue/5 text-aero-blue text-xs uppercase tracking-[0.2em] mb-8">
                            <Globe2 className="w-3.5 h-3.5" />
                            {t('cta.tag')}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {t('cta.title1')}
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t('cta.title2')}
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                            {t('cta.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
                                >
                                    <span className="flex items-center gap-2">
                                        {t('cta.btnProducts')}
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
                                    {t('cta.btnApps')}
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LowAltitudeEconomy;