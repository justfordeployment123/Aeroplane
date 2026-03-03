import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, ShieldCheck, ChevronRight, Rocket, Eye, Users, Globe2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const qualifications = [
    "Training Center for Large Civilian UAV Manipulators",
    "Remotely Piloted Aircraft Systems (RPAS) Air Operator Certificate",
    "Ministry Of Public Security Safety And Police Electronic Product Certification",
    "General Aviation Business Operation Certification",
    "Civil UAVs Pilot Training Agency Certification",
    "China Mobile Industrial Research Institute UAVs 5G Network Certification",
    "Intellectual Property Management System Certification",
    "Quality, Environmental, and Occupational Health Management Certification",
    "Enterprise AAA Credit Rating Certification",
];

const honors = [
    "2023 National High-Tech Enterprise",
    "Potential Unicorn Enterprises In Jiangsu Province",
    "Jiangsu Province Science And Technology SMEs",
    "Suzhou Low Altitude Economy Leading Enterprises",
    "2023 Dongshahu Venture Capital 'Annual Most Growth Enterprise'",
    "2021 'Kectron China' Leading Technology List",
    "Kunshan Advanced Unmanned Transportation System Key Laboratory",
    "Civil Aviation UAVs Industry Technology Innovation Strategic Alliance",
    "Suzhou University Master's Degree Graduate Practice Base",
];

const certificates = [
    { title: "National High-Tech Enterprise", img: "https://www.htsdfp.com/UploadFiles/2024-05-06/3y8p4kvlf33blgld.png" },
    { title: "Training Center for UAV Manipulators", img: "https://www.htsdfp.com/UploadFiles/2024-05-06/khg1eb8l1pmcskkr.png" },
    { title: "RPAS Air Operator Certificate", img: "https://www.htsdfp.com/UploadFiles/2024-05-06/bciybjpxxqq9a6x1.png" },
    { title: "Quality Management System Iso9001", img: "https://www.htsdfp.com/UploadFiles/2024-02-28/4shsqlbmmsqhz3xz.jpg" },
    { title: "Singapore Airshow Participation", img: "https://www.htsdfp.com/UploadFiles/2024-03-06/fwrtqkfpfvx7xvtu.png" },
    { title: "Civil UAVs Pilot Training Agency", img: "https://www.htsdfp.com/UploadFiles/2024-05-06/t8jkrqf2qngewm79.png" },
];

const coreValues = [
    {
        icon: Rocket,
        title: "Innovation First",
        desc: "Pushing the boundaries of autonomous aviation with cutting-edge AI and advanced engineering.",
        accent: "#00d2ff",
        stat: "100+",
        statLabel: "Patents Filed",
    },
    {
        icon: Eye,
        title: "Safety Obsessed",
        desc: "Triple-redundant flight systems and rigorous testing protocols ensure mission-critical reliability.",
        accent: "#10b981",
        stat: "99.9%",
        statLabel: "Flight Safety",
    },
    {
        icon: Users,
        title: "Customer Driven",
        desc: "Scenario-level solutions tailored to each client's unique operational requirements and environments.",
        accent: "#a855f7",
        stat: "500+",
        statLabel: "Global Clients",
    },
    {
        icon: Globe2,
        title: "Global Reach",
        desc: "Partnerships across 50+ countries, bringing autonomous aviation solutions to every continent.",
        accent: "#f97316",
        stat: "50+",
        statLabel: "Countries",
    },
];

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
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ perspective: "1200px" }}
            className="relative group"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative rounded-3xl overflow-hidden"
            >
                {/* Depth layers */}
                <div
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,210,255,0.15) 0%, transparent 60%)", transform: "translateZ(-20px)" }}
                />

                {/* Floating corner brackets at different Z-depths */}
                {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((cls, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-8 h-8 ${cls} border-aero-blue/40 z-20`}
                        style={{ transform: "translateZ(30px)" }}
                    />
                ))}

                {/* Glowing edge */}
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

                {/* Reflection on bottom */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#050508] to-transparent z-10" />
            </motion.div>
        </motion.div>
    );
};

/* ── 3D Flip Certificate Card ── */
const FlipCard = ({ cert, idx }: { cert: (typeof certificates)[number]; idx: number }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, rotateY: -30 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
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
                        background: "linear-gradient(160deg, #0e0e14 0%, #080810 100%)",
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
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0e0e14] to-transparent" />
                    <div className="absolute bottom-2 inset-x-0 text-center">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Hover to flip</span>
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
                    <span className="mt-2 text-[10px] text-aero-blue/70 uppercase tracking-widest">Verified</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ── Isometric Value Card ── */
const IsometricCard = ({ val, idx }: { val: (typeof coreValues)[number]; idx: number }) => {
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
            initial={{ opacity: 0, y: 60, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
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
                {/* Shadow layer */}
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
                        background: "#0a0a12",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${val.accent}, transparent)` }}
                    />

                    {/* Background number at depth */}
                    <motion.div
                        className="absolute top-4 right-4 text-[100px] font-black leading-none pointer-events-none select-none"
                        style={{
                            color: `${val.accent}08`,
                            transform: "translateZ(-20px)",
                        }}
                    >
                        {String(idx + 1).padStart(2, "0")}
                    </motion.div>

                    {/* Content at front depth */}
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

                        {/* Stat pill */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-black" style={{ color: val.accent }}>{val.stat}</span>
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
    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050508" }}>
            {/* ── Cinematic Hero ── */}
            <section className="relative h-[70vh] min-h-[550px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://www.htsdfp.com/UploadFiles/banner/ban_1.jpg')",
                        filter: "brightness(0.25) saturate(1.3)",
                    }}
                />

                {/* Cinematic letterbox bars */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050508] to-transparent z-[2]" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent z-[2]" />

                {/* Anamorphic light flare */}
                <motion.div
                    className="absolute top-1/2 left-0 right-0 h-[1px] z-[3]"
                    style={{ background: "linear-gradient(90deg, transparent 10%, rgba(0,210,255,0.4) 30%, rgba(168,85,247,0.3) 50%, rgba(0,210,255,0.4) 70%, transparent 90%)" }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                />

                {/* Floating data points */}
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
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <motion.span
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-aero-blue/30 bg-black/40 text-aero-blue text-sm font-medium tracking-wide mb-8 backdrop-blur-md"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            Established 2013
                        </motion.span>

                        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6">
                            <motion.span
                                className="inline-block"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                About
                            </motion.span>{" "}
                            <motion.span
                                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Us
                            </motion.span>
                        </h1>
                        <motion.p
                            className="text-xl text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Pioneering the transition from two-dimensional to three-dimensional autonomous transportation.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
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

            {/* ── Company Profile with 3D Parallax Image ── */}
            <section id="profile" className="py-28 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aero-blue/[0.04] rounded-full blur-[200px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-gradient-to-r from-aero-blue to-transparent" />
                            <span className="text-aero-blue text-xs uppercase tracking-[0.25em] font-semibold">Who We Are</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            Company{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Profile</span>
                        </h2>

                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                A cutting-edge aerospace enterprise at the forefront of unmanned aviation technology. We represent the pinnacle of modern aviation innovation, driven by a mission to transform how the world moves.
                            </p>
                            <p>
                                Our core mission is to leverage advanced unmanned system technology to provide comprehensive, scenario-level solutions for global industry users — driving the evolution of logistics, rescue, and transportation into the autonomous skies of tomorrow.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-black bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 text-sm"
                                >
                                    Our Products
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/applications">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center px-7 py-3.5 rounded-full font-medium text-gray-300 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300 text-sm"
                                >
                                    Applications
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <ParallaxImage
                            src="https://www.htsdfp.com/UploadFiles/2024-04-23/asgfuykn5nfrkksf.png"
                            alt="Company Profile Overview"
                        />
                    </motion.div>
                </div>
            </section>

            {/* ── Core Values — Isometric 3D Cards ── */}
            <section id="values" className="py-28 relative overflow-hidden" style={{ background: "#030306" }}>
                <div className="absolute inset-0">
                    {/* Hex grid pattern */}
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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.25em] mb-4 block font-semibold">What Drives Us</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-5">
                            Core{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Values</span>
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto">The principles that guide every decision, every flight, every innovation.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((val, idx) => (
                            <IsometricCard key={idx} val={val} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Qualifications — Split Panel with animated list ── */}
            <section id="honors" className="py-28 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-aero-purple/[0.05] rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-gradient-to-r from-aero-blue to-transparent" />
                            <span className="text-aero-blue text-xs uppercase tracking-[0.25em] font-semibold">Recognition</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            Honorary{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Qualifications</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                        {/* Qualifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl p-8 overflow-hidden"
                            style={{ background: "linear-gradient(160deg, #0a0a12 0%, #060610 100%)", border: "1px solid rgba(0,210,255,0.1)" }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/40 to-transparent" />

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-aero-blue/10 border border-aero-blue/25 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-aero-blue" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Industry Qualifications</h3>
                                    <p className="text-xs text-gray-600">{qualifications.length} certifications</p>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {qualifications.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="relative rounded-3xl p-8 overflow-hidden"
                            style={{ background: "linear-gradient(160deg, #0a0a12 0%, #060610 100%)", border: "1px solid rgba(168,85,247,0.1)" }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-purple/40 to-transparent" />

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-aero-purple/10 border border-aero-purple/25 flex items-center justify-center">
                                    <Award className="w-6 h-6 text-aero-purple" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Enterprise Honors</h3>
                                    <p className="text-xs text-gray-600">{honors.length} awards</p>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {honors.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">Certifications</h3>
                        <p className="text-sm text-gray-600">Hover to reveal details</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {certificates.map((cert, idx) => (
                            <FlipCard key={idx} cert={cert} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Vision — Cinematic reveal ── */}
            <section id="vision" className="py-28 relative overflow-hidden" style={{ background: "#030306" }}>
                <div className="absolute inset-0">
                    {/* Radiating lines */}
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
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                        <span className="text-aero-blue text-xs uppercase tracking-[0.25em] mb-4 block font-semibold">Looking Ahead</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                            Our{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Vision</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative inline-block max-w-5xl mx-auto"
                        style={{ perspective: "1200px" }}
                    >
                        <motion.div
                            whileHover={{ rotateX: -3, rotateY: 2, scale: 1.02 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Outer glow */}
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-aero-blue/10 via-aero-purple/5 to-aero-blue/10 blur-xl opacity-50" />

                            <div
                                className="relative rounded-3xl overflow-hidden p-1"
                                style={{
                                    background: "linear-gradient(135deg, rgba(0,210,255,0.2), rgba(168,85,247,0.1), rgba(0,210,255,0.2))",
                                }}
                            >
                                <div className="rounded-[22px] overflow-hidden bg-[#050508]">
                                    <img
                                        src="https://www.htsdfp.com/UploadFiles/2024-03-01/xphd7wktdh8z9f5m.png"
                                        alt="Vision Diagram"
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
                    {/* Slowly pulsing circles */}
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
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Ready to Partner
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">With Us?</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                            Join the next generation of autonomous aviation. Let's build the future of transportation together.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                                >
                                    <span className="flex items-center gap-2">
                                        Explore Products
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
                                    Training Center
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
