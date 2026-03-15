import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Award } from "lucide-react";
import { Link } from "react-router-dom";

export const TrainingPromo = () => {
    return (
        <section className="py-24 relative overflow-hidden" style={{ background: "#0e0e14" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-aero-blue/[0.04] rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">Pilot Training</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Training Center</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        AOPA-certified training institution offering comprehensive UAV pilot certification programs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Training Center Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group rounded-3xl p-8 border border-white/[0.06] hover:border-aero-blue/20 transition-all duration-500"
                        style={{ background: "linear-gradient(160deg, #181820 0%, #121218 100%)" }}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-aero-blue/10 border border-aero-blue/25 flex items-center justify-center mb-6">
                            <GraduationCap className="w-7 h-7 text-aero-blue" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Pilot Training Center</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Civil unmanned aerial vehicle pilot training institution certified by AOPA. Offers theoretical and practical instruction for Class III multi-rotor line-of-sight and beyond-line-of-sight pilots.
                        </p>
                        <Link to="/training">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                className="flex items-center gap-2 text-sm font-semibold text-aero-blue group/btn"
                            >
                                Learn more <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* AOPA Exam Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group rounded-3xl p-8 border border-white/[0.06] hover:border-aero-purple/20 transition-all duration-500"
                        style={{ background: "linear-gradient(160deg, #181820 0%, #121218 100%)" }}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-aero-purple/10 border border-aero-purple/25 flex items-center justify-center mb-6">
                            <Award className="w-7 h-7 text-aero-purple" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">AOPA Certification Exam</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Flexible scheduling accommodates diverse work arrangements. Dedicated class management with personalized student oversight. Experienced mentors guide practical project comprehension. Maintains 88–90% pass rate.
                        </p>
                        <Link to="/training">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                className="flex items-center gap-2 text-sm font-semibold text-aero-purple group/btn"
                            >
                                Learn more <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
