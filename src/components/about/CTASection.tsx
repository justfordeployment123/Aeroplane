import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RING_SIZES = [360, 560, 760];

interface CTASectionProps {
    reducedMotion?: boolean;
}

export const CTASection = ({ reducedMotion = false }: CTASectionProps) => {
    const { t } = useTranslation("about");

    return (
        <section className="py-28 sm:py-32 relative overflow-hidden" aria-labelledby="cta-heading">
            {/* Pulsing rings — skipped if reducedMotion */}
            {!reducedMotion && (
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    {RING_SIZES.map((size, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 rounded-full border border-aero-blue/[0.06]"
                            style={{ width: size, height: size, transform: "translate(-50%, -50%)" }}
                            animate={{ scale: [1, 1.04, 1], opacity: [0.25, 0.5, 0.25] }}
                            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6 }}
                        />
                    ))}
                </div>
            )}

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <motion.div
                    initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                        {t("cta.title1")}
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t("cta.title2")}</span>
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{t("cta.subtitle")}</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/products">
                            <motion.button
                                whileHover={reducedMotion ? {} : { scale: 1.04 }}
                                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                                className="group px-9 py-3.5 bg-white text-black font-bold rounded-full hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aero-blue"
                            >
                                <span className="flex items-center gap-2">
                                    {t("cta.btnProducts")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </span>
                            </motion.button>
                        </Link>
                        <Link to="/training">
                            <motion.button
                                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                                className="px-9 py-3.5 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                            >
                                {t("cta.btnTraining")}
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
