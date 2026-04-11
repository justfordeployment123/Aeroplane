import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RING_SIZES = [300, 500, 700];

interface TrainingCTAProps {
    reducedMotion?: boolean;
}

export const TrainingCTA = ({ reducedMotion = false }: TrainingCTAProps) => {
    const { t } = useTranslation("training");

    return (
        <section className="py-24 sm:py-32 border-t border-white/5 relative overflow-hidden" aria-labelledby="training-cta-heading">
            {/* Pulsing rings — skip if reducedMotion */}
            {!reducedMotion && (
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    {RING_SIZES.map((size, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 rounded-full border border-aero-blue/[0.04]"
                            style={{ width: size, height: size, transform: "translate(-50%, -50%)" }}
                            animate={{ scale: [1, 1.07, 1] }}
                            transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i * 0.8 }}
                        />
                    ))}
                </div>
            )}

            <motion.div
                initial={reducedMotion ? false : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "50px 0px" }}
                className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6"
            >
                <div
                    className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-7 bg-aero-blue/10 border border-aero-blue/22"
                    aria-hidden="true"
                >
                    <GraduationCap size={28} className="text-aero-blue" />
                </div>

                <h2 id="training-cta-heading" className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                    {t("cta.title")}
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t("cta.titleHighlight")}</span>
                </h2>

                <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t("cta.subtitle")}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={reducedMotion ? {} : { scale: 1.04 }}
                        whileTap={reducedMotion ? {} : { scale: 0.97 }}
                        className="group px-9 py-3.5 bg-white text-black font-bold rounded-full hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aero-blue"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {t("cta.enroll")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </span>
                    </motion.button>

                    <Link to="/about">
                        <motion.button
                            whileHover={reducedMotion ? {} : { scale: 1.03 }}
                            whileTap={reducedMotion ? {} : { scale: 0.97 }}
                            className="w-full sm:w-auto px-9 py-3.5 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                        >
                            {t("cta.learnAopa")}
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};
