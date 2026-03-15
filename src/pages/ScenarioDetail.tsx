import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getScenarioById, scenarios } from "../data/scenarios";

export const ScenarioDetail = () => {
    const { id } = useParams<{ id: string }>();
    const scenario = id ? getScenarioById(id) : undefined;

    if (!scenario) return <Navigate to="/applications" replace />;

    const accent = scenario.accent;
    const otherScenarios = scenarios.filter((s) => s.id !== scenario.id);

    return (
        <div className="min-h-screen text-white" style={{ background: "#121218" }}>
            {/* Hero */}
            <section className="relative pt-28 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 opacity-[0.015]"
                        style={{
                            backgroundImage: `linear-gradient(${accent}50 1px, transparent 1px), linear-gradient(90deg, ${accent}50 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[200px] opacity-[0.08] pointer-events-none"
                        style={{ background: accent }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        <Link
                            to="/applications"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeft size={14} /> Back to Applications
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                            <span
                                className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
                                style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}25` }}
                            >
                                Application Scenario
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">{scenario.title}</h1>
                            <p className="text-xl text-gray-400 font-medium mb-6">{scenario.subtitle}</p>
                            <p className="text-gray-400 leading-relaxed text-sm max-w-lg">{scenario.description}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div
                                className="absolute inset-0 rounded-3xl"
                                style={{ background: `radial-gradient(ellipse at center, ${accent}10 0%, transparent 70%)` }}
                            />
                            <img
                                src={scenario.heroImg}
                                alt={scenario.title}
                                className="relative z-10 w-full rounded-2xl object-cover max-h-[400px]"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Detail Cards */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ color: accent }}>
                            Operational Capabilities
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white">Detailed Solutions</h2>
                        <div className="h-px w-16 mt-4 mx-auto" style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }} />
                    </motion.div>

                    <div className="space-y-8">
                        {scenario.details.map((detail, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.5 }}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden border border-white/[0.06] p-2 ${
                                    idx % 2 === 1 ? "lg:direction-rtl" : ""
                                }`}
                                style={{ background: "#181820" }}
                            >
                                <div className={`${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                                    <div className="relative rounded-2xl overflow-hidden h-64 lg:h-80">
                                        <img src={detail.img} alt={detail.title} className="w-full h-full object-cover" />
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: `linear-gradient(to top, ${accent}10, transparent)` }}
                                        />
                                    </div>
                                </div>
                                <div className={`p-6 lg:p-10 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                                            style={{ background: `${accent}15`, color: accent }}
                                        >
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="text-xl font-bold text-white">{detail.title}</h3>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed text-sm">{detail.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Scenarios */}
            <section className="py-20 border-t border-white/[0.04]">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-aero-blue mb-3 block">Explore More</span>
                        <h2 className="text-3xl font-black text-white">Other Application Scenarios</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {otherScenarios.map((s, idx) => (
                            <Link key={s.id} to={`/applications/${s.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -6 }}
                                    className="group relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all h-52"
                                >
                                    <img src={s.heroImg} alt={s.title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/70 to-transparent" />
                                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                        <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: s.accent }}>
                                            {s.subtitle}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-1">{s.title}</h3>
                                        <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
                                            View Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
