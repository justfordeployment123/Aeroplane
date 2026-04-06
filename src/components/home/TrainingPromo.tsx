import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const TrainingPromo = () => {
    const { t } = useTranslation("home");

    return (
        <section className="py-24 relative overflow-hidden" style={{ background: "#111119" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-aero-blue/[0.04] rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div initial={{ y: 30 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="text-center mb-14">
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">{t("training.tag")}</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">{t("training.title")}</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">{t("training.subtitle")}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pilot Training Center */}
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
                        <h3 className="text-xl font-bold text-white mb-3">{t("training.pilotCenter.title")}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">{t("training.pilotCenter.desc")}</p>
                        <Link to="/training">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                className="flex items-center gap-2 text-sm font-semibold text-aero-blue group/btn"
                            >
                                {t("training.learnMore")} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* AOPA Exam */}
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
                        <h3 className="text-xl font-bold text-white mb-3">{t("training.aopa.title")}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">{t("training.aopa.desc")}</p>
                        <Link to="/training">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                className="flex items-center gap-2 text-sm font-semibold text-aero-purple group/btn"
                            >
                                {t("training.learnMore")} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
