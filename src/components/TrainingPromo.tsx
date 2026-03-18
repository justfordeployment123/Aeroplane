import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Award } from "lucide-react";
import { Link } from "react-router-dom";

export const TrainingPromo = () => {
    return (
        <section className="py-24 relative overflow-hidden" style={{ background: "#111119" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-aero-blue/[0.04] rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ y: 30 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "200px 0px" }}
                    className="text-center mb-14"
                >
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">Pilot Training</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Training Center</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        Civil UAV pilot training institution certified by the China Association of Aircraft Owners and Pilots (AOPA).
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Training Center Card */}
                    <motion.div
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="group rounded-3xl p-8 border border-white/[0.06] hover:border-aero-blue/20 transition-all duration-500"
                        style={{ background: "linear-gradient(160deg, #1c1c2a 0%, #161622 100%)" }}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-aero-blue/10 border border-aero-blue/25 flex items-center justify-center mb-6">
                            <GraduationCap className="w-7 h-7 text-aero-blue" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Pilot Training Center</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            A civil unmanned aerial vehicle pilot training institution (Class III multi rotor) certified by the China Association of Aircraft Owners and Pilots (AOPA) can provide theoretical and practical training for Class III multi rotor in line of sight pilots and Class III multi rotor over line of sight pilots.
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
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        transition={{ delay: 0.1 }}
                        className="group rounded-3xl p-8 border border-white/[0.06] hover:border-aero-purple/20 transition-all duration-500"
                        style={{ background: "linear-gradient(160deg, #1c1c2a 0%, #161622 100%)" }}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-aero-purple/10 border border-aero-purple/25 flex items-center justify-center mb-6">
                            <Award className="w-7 h-7 text-aero-purple" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">AOPA Certification Exam</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Humanized course arrangement, with off duty classes and weekend classes, suitable for different working groups to register. Class management system, where each class is managed by a dedicated person and each student's study and rest time is reasonably arranged. Experienced mentors in practical projects, allowing students to quickly understand the application of drones in practical projects. High pass rate, with a multi rotor drone pilot class pass rate of 88%-90%.
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
