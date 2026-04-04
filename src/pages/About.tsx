import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, ShieldCheck, ChevronRight, Rocket, Eye, Users, Globe2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next"; // <-- Added import

/* ── 3D Parallax Image ── */
const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 25 });
    const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 25 });
    const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 25 });

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
        <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} style={{ perspective: "1200px" }} className="relative group">
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative rounded-3xl overflow-hidden">
                <div
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: "radial-gradient(ellipse at 50% 50%, rgba(0,210,255,0.15) 0%, transparent 60%)",
                        transform: "translateZ(-20px)",
                    }}
                />

                {[
                    "top-3 left-3 border-t-2 border-l-2",
                    "top-3 right-3 border-t-2 border-r-2",
                    "bottom-3 left-3 border-b-2 border-l-2",
                    "bottom-3 right-3 border-b-2 border-r-2",
                ].map((cls, i) => (
                    <motion.div key={i} className={`absolute w-8 h-8 ${cls} border-aero-blue/40 z-20`} style={{ transform: "translateZ(30px)" }} />
                ))}

                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aero-blue/50 to-transparent z-10" />

                <div
                    className="relative border border-white/10"
                    style={{ boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)" }}
                >
                    <motion.img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover rounded-3xl"
                        style={{ x: imgX, y: imgY }}
                    />
                </div>

                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#161622] to-transparent z-10" />
            </motion.div>
        </motion.div>
    );
};

/* ── 3D Flip Certificate Card ── */
// Added translation inside this component so it handles its own static text
const FlipCard = ({ cert, idx }: { cert: { title: string; img: string }; idx: number }) => {
    const [flipped, setFlipped] = useState(false);
    const { t } = useTranslation(); // Note: Add 'about' if using namespaces: useTranslation('about')

    return (
        <motion.div
            initial={{ rotateY: -30 }}
            whileInView={{ rotateY: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="cursor-pointer"
            style={{ perspective: "800px" }}
            onClick={() => setFlipped(!flipped)}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
            >
                {/* Front */}
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        background: "linear-gradient(160deg, #202030 0%, #111119 100%)",
                        border: "1px solid rgba(255,255,255,0.07)",
                    }}
                >
                    <div className="aspect-[4/3] p-4 flex items-center justify-center">
                        <img
                            src={cert.img}
                            alt={cert.title}
                            loading="lazy"
                            decoding="async"
                            className="max-h-full max-w-full object-contain drop-shadow-md"
                        />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#202030] to-transparent" />
                    <div className="absolute bottom-2 inset-x-0 text-center">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{t("recognition.certs.hoverText")}</span>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 text-center"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "linear-gradient(160deg, rgba(0,210,255,0.12) 0%, rgba(168,85,247,0.08) 100%)",
                        border: "1px solid rgba(0,210,255,0.3)",
                        boxShadow: "0 0 30px rgba(0,210,255,0.1)",
                    }}
                >
                    <ShieldCheck className="w-6 h-6 text-aero-blue mb-3" />
                    <p className="text-xs text-white font-semibold leading-snug">{cert.title}</p>
                    <div className="mt-2 w-8 h-[1px] bg-gradient-to-r from-transparent via-aero-blue to-transparent" />
                    <span className="mt-2 text-[10px] text-aero-blue/70 uppercase tracking-widest">{t("recognition.certs.verified")}</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ── Isometric Value Card ── */
const IsometricCard = ({ val, idx }: { val: any; idx: number }) => {
    const Icon = val.icon;
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

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
            initial={{ y: 60, rotateX: 15 }}
            whileInView={{ y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ delay: idx * 0.15, duration: 0.7 }}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={handleLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative"
            >
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        transform: "translateZ(-30px) translateY(10px)",
                        background: `${val.accent}15`,
                        filter: "blur(30px)",
                    }}
                />

                <div
                    className="relative rounded-3xl overflow-hidden h-full"
                    style={{
                        background: "#181826",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${val.accent}, transparent)` }}
                    />

                    <motion.div
                        className="absolute top-4 right-4 text-[100px] font-black leading-none pointer-events-none select-none"
                        style={{
                            color: `${val.accent}08`,
                            transform: "translateZ(-20px)",
                        }}
                    >
                        {String(idx + 1).padStart(2, "0")}
                    </motion.div>

                    <motion.div className="relative p-8" style={{ transform: "translateZ(20px)" }}>
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                            style={{
                                background: `linear-gradient(135deg, ${val.accent}20, ${val.accent}05)`,
                                border: `1px solid ${val.accent}30`,
                                boxShadow: `0 0 30px ${val.accent}15`,
                            }}
                        >
                            <Icon className="w-7 h-7" style={{ color: val.accent }} />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-6 group-hover:text-gray-400 transition-colors">{val.desc}</p>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-black" style={{ color: val.accent }}>
                                {val.stat}
                            </span>
                            <div>
                                <div className="h-px w-8 mb-1" style={{ background: `${val.accent}40` }} />
                                <span className="text-[10px] text-gray-600 uppercase tracking-widest">{val.statLabel}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const About = () => {
    // Note: Add 'about' inside the hook if you set up namespaces: useTranslation('about')
    const { t } = useTranslation("about");
    // 1. Fetch the raw data
    const rawQuals = t("qualifications", { returnObjects: true });
    const rawHonors = t("honorsList", { returnObjects: true });
    const rawAcademic = t("academic.items", { returnObjects: true });

    // 2. Safely ensure they are arrays before continuing
    const qualifications = Array.isArray(rawQuals) ? rawQuals : [];
    const honors = Array.isArray(rawHonors) ? rawHonors : [];
    const academicAffiliations = Array.isArray(rawAcademic) ? rawAcademic : [];

    // UseMemo ensures these only rebuild when the language changes
    const certificates = useMemo(
        () => [
            { title: t("recognition.certs.items.cert1"), img: "/images/about/cert-1.png" },
            { title: t("recognition.certs.items.cert2"), img: "/images/about/cert-2.png" },
            { title: t("recognition.certs.items.cert3"), img: "/images/about/cert-3.png" },
            { title: t("recognition.certs.items.cert4"), img: "/images/about/cert-4.jpg" },
            { title: t("recognition.certs.items.cert5"), img: "/images/about/cert-5.png" },
            { title: t("recognition.certs.items.cert6"), img: "/images/about/cert-6.png" },
        ],
        [t],
    );

    const coreValues = useMemo(
        () => [
            {
                icon: Rocket,
                title: t("values.items.sys.title"),
                desc: t("values.items.sys.desc"),
                accent: "#00d2ff",
                stat: "100%",
                statLabel: t("values.items.sys.statLabel"),
            },
            {
                icon: Eye,
                title: t("values.items.layout.title"),
                desc: t("values.items.layout.desc"),
                accent: "#10b981",
                stat: "11+",
                statLabel: t("values.items.layout.statLabel"),
            },
            {
                icon: Users,
                title: t("values.items.time.title"),
                desc: t("values.items.time.desc"),
                accent: "#a855f7",
                stat: "10W+",
                statLabel: t("values.items.time.statLabel"),
            },
            {
                icon: Globe2,
                title: t("values.items.cert.title"),
                desc: t("values.items.cert.desc"),
                accent: "#f97316",
                stat: "TC",
                statLabel: t("values.items.cert.statLabel"),
            },
        ],
        [t],
    );

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            {/* ── Cinematic Hero ── */}
            <section className="relative h-[70vh] min-h-[550px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/banners/about-hero.jpg')",
                        filter: "brightness(0.25) saturate(1.3)",
                    }}
                />

                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#161622] to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#161622] to-transparent z-[2]" />

                <motion.div
                    className="absolute top-1/2 left-0 right-0 h-[1px] z-[3]"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 10%, rgba(0,210,255,0.4) 30%, rgba(168,85,247,0.3) 50%, rgba(0,210,255,0.4) 70%, transparent 90%)",
                    }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                />

                <div className="absolute inset-0 z-[2]">
                    {[
                        { x: "15%", y: "30%", delay: 0 },
                        { x: "80%", y: "25%", delay: 1.5 },
                        { x: "70%", y: "65%", delay: 0.8 },
                        { x: "25%", y: "70%", delay: 2.2 },
                    ].map((dot, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-aero-blue/50 rounded-full"
                            style={{ left: dot.x, top: dot.y }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.5, 0.5],
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: dot.delay }}
                        />
                    ))}
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ y: 30 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
                        <motion.span
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-aero-blue/30 bg-aero-card/80 text-aero-blue text-sm font-medium tracking-wide mb-8 backdrop-blur-md"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            {t("hero.badge")}
                        </motion.span>

                        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6">
                            <motion.span className="inline-block" initial={{ y: 40 }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                                {t("hero.title1")}
                            </motion.span>{" "}
                            <motion.span
                                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple"
                                initial={{ y: 40 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                {t("hero.title2")}
                            </motion.span>
                        </h1>
                        <motion.p
                            className="text-xl text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            {t("hero.subtitle")}
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
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

            {/* ── Company Profile ── */}
            <section id="profile" className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aero-blue/[0.04] rounded-full blur-[200px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ x: -40 }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-gradient-to-r from-aero-blue to-transparent" />
                            <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("profile.tag")}</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            {t("profile.title1")}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t("profile.title2")}
                            </span>
                        </h2>

                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                {t("profile.p1_start")}
                                <span className="text-aero-blue font-semibold">{t("profile.p1_highlight")}</span>
                                {t("profile.p1_end")}
                            </p>
                            <p>{t("profile.p2")}</p>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-black bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 text-sm"
                                >
                                    {t("profile.btnProducts")}
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/applications">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center px-7 py-3.5 rounded-full font-medium text-gray-300 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300 text-sm"
                                >
                                    {t("profile.btnApps")}
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 40 }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <ParallaxImage src="/images/about/company-profile.png" alt={t("profile.title1") + " " + t("profile.title2")} />
                    </motion.div>
                </div>
            </section>

            {/* ── Core Values ── */}
            <section id="values" className="py-24 relative overflow-hidden" style={{ background: "#111119" }}>
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,210,255,0.5) 1px, transparent 0)`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ y: 30 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="text-center mb-20"
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">{t("values.tag")}</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-5">
                            {t("values.title1")}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t("values.title2")}</span>
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto">{t("values.subtitle")}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((val, idx) => (
                            <IsometricCard key={idx} val={val} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Qualifications ── */}
            <section id="honors" className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-aero-purple/[0.05] rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-gradient-to-r from-aero-blue to-transparent" />
                            <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("recognition.tag")}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            {t("recognition.title1")}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t("recognition.title2")}
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                        {/* Qualifications */}
                        <motion.div
                            initial={{ y: 30 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "200px 0px" }}
                            className="relative rounded-3xl p-8 overflow-hidden"
                            style={{ background: "linear-gradient(160deg, #181826 0%, #111119 100%)", border: "1px solid rgba(0,210,255,0.1)" }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/40 to-transparent" />

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-aero-blue/10 border border-aero-blue/25 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-aero-blue" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{t("recognition.industry.title")}</h3>
                                    <p className="text-xs text-gray-600">
                                        {qualifications.length} {t("recognition.industry.subtitle")}
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {qualifications.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ x: -20 }}
                                        whileInView={{ x: 0 }}
                                        viewport={{ once: true, margin: "200px 0px" }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-start text-gray-400 text-sm group/item hover:text-gray-200 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-aero-blue/50 mr-2 shrink-0 mt-0.5 group-hover/item:text-aero-blue transition-colors" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Honors */}
                        <motion.div
                            initial={{ y: 30 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "200px 0px" }}
                            transition={{ delay: 0.15 }}
                            className="relative rounded-3xl p-8 overflow-hidden"
                            style={{ background: "linear-gradient(160deg, #181826 0%, #111119 100%)", border: "1px solid rgba(168,85,247,0.1)" }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-purple/40 to-transparent" />

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-aero-purple/10 border border-aero-purple/25 flex items-center justify-center">
                                    <Award className="w-6 h-6 text-aero-purple" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{t("recognition.enterprise.title")}</h3>
                                    <p className="text-xs text-gray-600">
                                        {honors.length} {t("recognition.enterprise.subtitle")}
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {honors.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ x: -20 }}
                                        whileInView={{ x: 0 }}
                                        viewport={{ once: true, margin: "200px 0px" }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-start text-gray-400 text-sm group/item hover:text-gray-200 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-aero-purple/50 mr-2 shrink-0 mt-0.5 group-hover/item:text-aero-purple transition-colors" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* 3D Flip Certificates */}
                    <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-2">{t("recognition.certs.title")}</h3>
                        <p className="text-sm text-gray-600">{t("recognition.certs.subtitle")}</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {certificates.map((cert, idx) => (
                            <FlipCard key={idx} cert={cert} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Academic & Research Affiliations ── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-aero-blue/[0.04] rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-gradient-to-r from-aero-blue to-transparent" />
                            <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("academic.tag")}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            {t("academic.title1")}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t("academic.title2")}
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {academicAffiliations.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ y: 20 }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true, margin: "200px 0px" }}
                                transition={{ delay: idx * 0.06 }}
                                className="group rounded-2xl p-6 border border-white/[0.06] hover:border-aero-blue/20 transition-all duration-500"
                                style={{ background: "linear-gradient(160deg, #1c1c2a 0%, #161622 100%)" }}
                            >
                                <span className="text-[10px] font-bold tracking-widest uppercase text-aero-blue/60 mb-3 block">{item.type}</span>
                                <h4 className="text-white font-bold mb-1 group-hover:text-aero-blue transition-colors">{item.name}</h4>
                                <p className="text-xs text-gray-500">{item.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Vision ── */}
            <section id="vision" className="py-24 relative overflow-hidden" style={{ background: "#111119" }}>
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]">
                        {[0, 45, 90, 135].map((deg) => (
                            <div
                                key={deg}
                                className="absolute top-1/2 left-1/2 w-full h-[1px] -translate-y-1/2 opacity-[0.03]"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                                    background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.5), transparent)",
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-16">
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">{t("vision.tag")}</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                            {t("vision.title1")}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t("vision.title2")}</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ y: 60, scale: 0.95 }}
                        whileInView={{ y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        transition={{ duration: 1 }}
                        className="relative inline-block max-w-5xl mx-auto"
                        style={{ perspective: "1200px" }}
                    >
                        <motion.div
                            whileHover={{ rotateX: -3, rotateY: 2, scale: 1.02 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-aero-blue/10 via-aero-purple/5 to-aero-blue/10 blur-xl opacity-50" />

                            <div
                                className="relative rounded-3xl overflow-hidden p-1"
                                style={{
                                    background: "linear-gradient(135deg, rgba(0,210,255,0.2), rgba(168,85,247,0.1), rgba(0,210,255,0.2))",
                                }}
                            >
                                <div className="rounded-[22px] overflow-hidden bg-[#161622]">
                                    <img
                                        src="/images/about/vision.png"
                                        alt={t("vision.title1") + " " + t("vision.title2")}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    {[400, 600, 800].map((size, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 rounded-full border border-aero-blue/[0.06]"
                            style={{
                                width: size,
                                height: size,
                                transform: "translate(-50%, -50%)",
                            }}
                            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
                        />
                    ))}
                </div>

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ y: 30 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            {t("cta.title1")}
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t("cta.title2")}</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">{t("cta.subtitle")}</p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                                >
                                    <span className="flex items-center gap-2">
                                        {t("cta.btnProducts")}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </Link>
                            <Link to="/training">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-4 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300"
                                >
                                    {t("cta.btnTraining")}
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
