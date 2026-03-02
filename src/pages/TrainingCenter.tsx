import { motion } from "framer-motion";
import { Calendar, Users, GraduationCap, TrendingUp, ShieldCheck, Award, Clock, CheckCircle2, ChevronRight } from "lucide-react";

const features = [
    {
        title: "Humanized Course Arrangement",
        desc: "Off-duty and weekend classes perfectly suited for working professionals — train without disrupting your career.",
        icon: Calendar,
        accent: "#00d2ff",
    },
    {
        title: "Class Management System",
        desc: "A dedicated specialist manages every class, ensuring each student's study and rest schedule is optimally arranged.",
        icon: Users,
        accent: "#a855f7",
    },
    {
        title: "Experienced Mentors",
        desc: "Learn directly from industry veterans through hands-on projects, mastering real-world UAV applications fast.",
        icon: GraduationCap,
        accent: "#10b981",
    },
    {
        title: "Elite Pass Rate",
        desc: "We maintain an extraordinary standard — multi-rotor UAV pilot class pass rate of 88%–90%, industry-leading.",
        icon: TrendingUp,
        accent: "#f97316",
    },
];

const stats = [
    { value: "88–90%", label: "Exam Pass Rate", icon: Award },
    { value: "500+", label: "Certified Pilots", icon: ShieldCheck },
    { value: "AOPA", label: "Certified Institution", icon: CheckCircle2 },
    { value: "10+", label: "Years Experience", icon: Clock },
];

const processSteps = [
    { step: "01", title: "Register", desc: "Submit application & select your preferred schedule" },
    { step: "02", title: "Theory", desc: "Complete certified ground school coursework" },
    { step: "03", title: "Flight", desc: "Hands-on practical flight training with mentors" },
    { step: "04", title: "Certify", desc: "Pass AOPA examination & receive your license" },
];

export const TrainingCenter = () => {
    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050508" }}>
            {/* ── Hero ── */}
            <section className="relative h-[58vh] min-h-105 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://www.htsdfp.com/UploadFiles/2023-09-26/uzpu69cnkk5w4uf5.png')",
                        filter: "brightness(0.28) saturate(1.3)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #050508 8%, rgba(5,5,8,0.2) 55%, transparent 100%)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,210,255,0.1) 0%, transparent 65%)" }}
                />
                <div
                    className="absolute inset-0 opacity-[0.035]"
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
                            AeroNexus Flight Academy
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
                            Training{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #00d2ff 0%, #a855f7 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Center
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-md mx-auto mt-3">
                            AOPA-certified UAV pilot training for the next generation of aviation professionals.
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

            {/* ── Sticky Nav ── */}
            <div
                className="sticky top-18 z-40 border-b"
                style={{
                    background: "rgba(5,5,8,0.88)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.06)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-0 flex items-center justify-between">
                    <div className="flex">
                        {["Training Center", "AOPA Exam"].map((tab, i) => (
                            <button
                                key={tab}
                                className="relative px-5 py-4 text-sm font-semibold transition-colors"
                                style={{ color: i === 0 ? "#00d2ff" : "rgba(255,255,255,0.35)" }}
                            >
                                {tab}
                                {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "#00d2ff" }} />}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="hover:text-white cursor-pointer transition-colors">Home</span>
                        <ChevronRight size={12} className="opacity-40" />
                        <span className="text-white font-semibold">Training Center</span>
                    </div>
                </div>
            </div>

            {/* ── Stats Bar ── */}
            <section className="py-12 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="relative rounded-2xl p-5 text-center group"
                                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: "rgba(0,210,255,0.04)", border: "1px solid rgba(0,210,255,0.15)" }}
                                    />
                                    <Icon size={18} className="mx-auto mb-2 opacity-40" style={{ color: "#00d2ff" }} />
                                    <div className="text-2xl font-black text-white">{stat.value}</div>
                                    <div className="text-xs text-gray-600 uppercase tracking-widest font-medium mt-0.5">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Intro Block ── */}
            <section className="py-20 relative overflow-hidden">
                <div
                    className="absolute top-0 right-1/4 w-125 h-125 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(0,210,255,0.05) 0%, transparent 70%)" }}
                />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl p-10 md:p-14 text-center overflow-hidden"
                        style={{
                            background: "linear-gradient(160deg, rgba(0,210,255,0.06) 0%, rgba(168,85,247,0.04) 100%)",
                            border: "1px solid rgba(0,210,255,0.15)",
                            boxShadow: "0 0 60px rgba(0,210,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        {/* corner brackets */}
                        {[
                            "top-4 left-4 border-t border-l",
                            "top-4 right-4 border-t border-r",
                            "bottom-4 left-4 border-b border-l",
                            "bottom-4 right-4 border-b border-r",
                        ].map((cls, i) => (
                            <div key={i} className={`absolute w-5 h-5 ${cls}`} style={{ borderColor: "rgba(0,210,255,0.3)" }} />
                        ))}

                        <div
                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-6"
                            style={{ background: "rgba(0,210,255,0.1)", border: "1px solid rgba(0,210,255,0.25)" }}
                        >
                            <ShieldCheck size={26} style={{ color: "#00d2ff" }} />
                        </div>

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                            <span className="text-white font-bold">AeroNexus Co., Ltd.</span> is a premier civil UAV pilot training institution
                            certified by the{" "}
                            <span style={{ color: "#00d2ff" }} className="font-semibold">
                                China Aircraft Owners and Pilots Association (AOPA)
                            </span>
                            . We provide elite theoretical and practical training for Class III multi-rotor in-line-of-sight and over-line-of-sight
                            pilots.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Process Steps ── */}
            <section className="py-8 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <span className="text-xs font-black tracking-[0.25em] uppercase mb-2 block" style={{ color: "#00d2ff" }}>
                            Your Journey
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">How It Works</h2>
                        <div className="h-px w-16 mt-4 rounded-full" style={{ background: "linear-gradient(to right, #00d2ff, transparent)" }} />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group rounded-2xl p-6 overflow-hidden"
                                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                    style={{ boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.2)", background: "rgba(0,210,255,0.03)" }}
                                />
                                {/* connector line */}
                                {i < processSteps.length - 1 && (
                                    <div
                                        className="hidden lg:block absolute top-8 -right-2 w-4 h-px z-20"
                                        style={{ background: "rgba(0,210,255,0.3)" }}
                                    />
                                )}
                                <div className="text-4xl font-black mb-4 leading-none" style={{ color: "rgba(0,210,255,0.15)" }}>
                                    {step.step}
                                </div>
                                <h3 className="text-base font-black text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Visual Panels (Process + Cert) ── */}
            <section className="py-10 pb-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Service Process",
                            sub: "Step-by-step flowchart",
                            accent: "#00d2ff",
                            img: "https://www.htsdfp.com/UploadFiles/2024-02-26/xhmubk4wypgpstlx.jpg",
                            dir: -30,
                        },
                        {
                            title: "Certification",
                            sub: "AOPA official qualification",
                            accent: "#a855f7",
                            img: "https://www.htsdfp.com/UploadFiles/2024-04-07/8islrvytlbjksxkr.jpg",
                            dir: 30,
                        },
                    ].map((panel, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: panel.dir }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65 }}
                            className="flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div>
                                    <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-0.5" style={{ color: panel.accent }}>
                                        {panel.sub}
                                    </p>
                                    <h2 className="text-2xl font-black text-white">{panel.title}</h2>
                                </div>
                                <div
                                    className="h-px flex-1 rounded-full"
                                    style={{ background: `linear-gradient(to right, ${panel.accent}50, transparent)` }}
                                />
                            </div>

                            <div
                                className="group relative flex-1 rounded-3xl overflow-hidden flex items-center justify-center p-6"
                                style={{
                                    background: "linear-gradient(160deg, rgba(255,255,255,0.03) 0%, #050508 100%)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    minHeight: 280,
                                }}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                                    style={{ background: `radial-gradient(ellipse at 50% 50%, ${panel.accent}10 0%, transparent 65%)` }}
                                />
                                <div
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                    style={{ boxShadow: `inset 0 0 0 1px ${panel.accent}25` }}
                                />
                                {[
                                    "top-3 left-3 border-t border-l",
                                    "top-3 right-3 border-t border-r",
                                    "bottom-3 left-3 border-b border-l",
                                    "bottom-3 right-3 border-b border-r",
                                ].map((cls, j) => (
                                    <div
                                        key={j}
                                        className={`absolute w-4 h-4 ${cls} opacity-20 group-hover:opacity-50 transition-opacity`}
                                        style={{ borderColor: panel.accent }}
                                    />
                                ))}
                                <motion.img
                                    src={panel.img}
                                    alt={panel.title}
                                    className="relative z-10 w-full h-auto rounded-xl drop-shadow-2xl"
                                    whileHover={{ scale: 1.04 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Course Features ── */}
            <section className="py-20 relative overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,210,255,0.04) 0%, transparent 60%)" }}
                />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
                        <span className="text-xs font-black tracking-[0.25em] uppercase mb-2 block" style={{ color: "#00d2ff" }}>
                            What Sets Us Apart
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Course Features</h2>
                        <div className="h-px w-16 mt-4 rounded-full" style={{ background: "linear-gradient(to right, #00d2ff, #a855f7)" }} />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group relative rounded-2xl p-7 overflow-hidden"
                                    style={{
                                        background: "linear-gradient(160deg, #0e0e14 0%, #08080f 100%)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                        style={{ boxShadow: `inset 0 0 0 1px ${feature.accent}35, 0 16px 40px -12px ${feature.accent}20` }}
                                    />

                                    <div className="flex items-start gap-5">
                                        <div
                                            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                                            style={{
                                                background: `${feature.accent}12`,
                                                border: `1px solid ${feature.accent}25`,
                                                boxShadow: `0 0 20px ${feature.accent}15`,
                                            }}
                                        >
                                            <Icon size={22} style={{ color: feature.accent }} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-base font-black text-white">{feature.title}</h3>
                                                <div
                                                    className="h-px flex-1"
                                                    style={{ background: `linear-gradient(to right, ${feature.accent}30, transparent)` }}
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 border-t relative overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,210,255,0.07) 0%, transparent 60%)" }}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 text-center max-w-xl mx-auto px-6"
                >
                    <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-6"
                        style={{ background: "rgba(0,210,255,0.08)", border: "1px solid rgba(0,210,255,0.2)" }}
                    >
                        <GraduationCap size={26} style={{ color: "#00d2ff" }} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Ready to get certified?</h2>
                    <p className="text-gray-500 mb-8 text-base">Join hundreds of certified UAV pilots trained at our AOPA-approved academy.</p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <button
                            className="px-7 py-3 rounded-xl text-sm font-black text-black transition-all hover:scale-[1.03] active:scale-[0.98]"
                            style={{ background: "linear-gradient(135deg, #00d2ff, #a855f7)", boxShadow: "0 0 32px rgba(0,210,255,0.22)" }}
                        >
                            Enroll Now
                        </button>
                        <button
                            className="px-7 py-3 rounded-xl text-sm font-bold text-white transition-all hover:border-white/30"
                            style={{ border: "1px solid rgba(255,255,255,0.11)", background: "rgba(255,255,255,0.04)" }}
                        >
                            Learn About AOPA Exam
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default TrainingCenter;
