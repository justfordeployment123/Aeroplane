import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WhitePaperProps {
    reducedMotion?: boolean;
}

export const WhitePaper = ({ reducedMotion = false }: WhitePaperProps) => {
    const { t } = useTranslation("economy");

    return (
        <section className="py-20 sm:py-24 relative overflow-hidden" aria-labelledby="whitepaper-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={reducedMotion ? false : { y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 id="whitepaper-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                        {t("whitepaper.tag")}
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-aero-blue to-aero-purple mx-auto rounded-full" aria-hidden="true" />
                </motion.div>

                <motion.div
                    initial={reducedMotion ? false : { y: 32, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    transition={{ duration: 0.6 }}
                    className="group relative rounded-3xl overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, #181826 0%, #111119 100%)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 32px 64px -16px rgba(0,0,0,0.5)",
                    }}
                >
                    {/* Hover border glow */}
                    <div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.18)" }}
                        aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image panel */}
                        <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden flex items-center justify-center p-6 sm:p-8">
                            <div
                                className="absolute inset-0 bg-gradient-to-tr from-aero-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                aria-hidden="true"
                            />
                            {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((cls, i) => (
                                <div
                                    key={i}
                                    className={`absolute w-4 h-4 sm:w-5 sm:h-5 ${cls} border-aero-blue/18 opacity-30 group-hover:opacity-55 transition-opacity`}
                                    aria-hidden="true"
                                />
                            ))}
                            <motion.img
                                src="/images/economy/whitepaper.png"
                                alt={t("whitepaper.title")}
                                loading="lazy"
                                decoding="async"
                                className="relative z-10 w-full max-w-xs sm:max-w-sm object-contain drop-shadow-[0_10px_25px_rgba(0,210,255,0.12)]"
                                whileHover={reducedMotion ? {} : { scale: 1.04, rotateY: 4 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                            />
                        </div>

                        {/* Text panel */}
                        <div className="p-8 sm:p-10 md:p-14 flex flex-col justify-center relative">
                            <div
                                className="absolute top-0 right-0 w-28 h-28 bg-aero-blue/10 rounded-bl-full blur-2xl group-hover:bg-aero-purple/18 transition-colors"
                                aria-hidden="true"
                            />

                            <div className="flex items-center text-aero-blue mb-4">
                                <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
                                <span className="text-sm font-semibold tracking-wider uppercase">{t("whitepaper.badge")}</span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                                {t("whitepaper.title")}
                            </h3>

                            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                                {t("whitepaper.desc")}
                            </p>

                            <motion.button
                                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                                className="inline-flex items-center w-fit px-6 py-3 rounded-full font-medium text-white border border-aero-blue/40 bg-aero-blue/10 hover:bg-aero-blue hover:text-black transition-all duration-300 group/btn shadow-[0_0_18px_rgba(0,210,255,0.12)] hover:shadow-[0_0_28px_rgba(0,210,255,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aero-blue"
                            >
                                {t("whitepaper.btnRead")}
                                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};