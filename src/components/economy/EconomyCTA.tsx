import { motion } from "framer-motion";
import { Globe2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface EconomyCTAProps {
    reducedMotion?: boolean;
}

export const EconomyCTA = ({ reducedMotion = false }: EconomyCTAProps) => {
    const { t } = useTranslation("economy");

    return (
        <section
            className="py-24 sm:py-32 relative overflow-hidden border-t border-white/5"
            aria-labelledby="economy-cta-heading"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#161622] to-[#161622]" aria-hidden="true" />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-aero-blue/[0.06] rounded-full blur-[180px] pointer-events-none"
                aria-hidden="true"
            />

            {/* Ellipse rings — skip if reducedMotion */}
            {!reducedMotion && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aero-blue/40"
                            style={{ width: `${300 + i * 150}px`, height: `${200 + i * 100}px` }}
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-blue/5 text-aero-blue text-xs uppercase tracking-[0.2em] mb-7">
                        <Globe2 className="w-3.5 h-3.5" aria-hidden="true" />
                        {t("cta.tag")}
                    </div>

                    <h2
                        id="economy-cta-heading"
                        className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
                    >
                        {t("cta.title1")}
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("cta.title2")}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t("cta.subtitle")}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/products">
                            <motion.button
                                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                                className="px-9 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aero-blue"
                            >
                                <span className="flex items-center gap-2">
                                    {t("cta.btnProducts")}
                                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                                </span>
                            </motion.button>
                        </Link>
                        <Link to="/applications">
                            <motion.button
                                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                                className="px-9 py-3.5 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                            >
                                {t("cta.btnApps")}
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};