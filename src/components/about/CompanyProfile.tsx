import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ParallaxImage } from "./shared/ParallaxImage";

interface CompanyProfileProps {
    reducedMotion?: boolean;
}

export const CompanyProfile = ({ reducedMotion = false }: CompanyProfileProps) => {
    const { t } = useTranslation("about");

    return (
        <section id="profile" className="py-20 sm:py-24 relative overflow-hidden" aria-labelledby="profile-heading">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aero-blue/[0.04] rounded-full blur-[180px] pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                {/* Text */}
                <motion.div
                    initial={reducedMotion ? false : { x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex items-center gap-3 mb-5" aria-hidden="true">
                        <div className="h-px w-10 bg-gradient-to-r from-aero-blue to-transparent" />
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("profile.tag")}</span>
                    </div>

                    <h2 id="profile-heading" className="text-4xl md:text-5xl font-bold mb-7 leading-tight">
                        {t("profile.title1")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("profile.title2")}
                        </span>
                    </h2>

                    <div className="space-y-5 text-gray-300 leading-relaxed text-base sm:text-lg">
                        <p>
                            {t("profile.p1_start")}
                            <span className="text-aero-blue font-semibold">{t("profile.p1_highlight")}</span>
                            {t("profile.p1_end")}
                        </p>
                        <p>{t("profile.p2")}</p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/products">
                            <motion.button
                                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                                className="group inline-flex items-center px-6 py-3 rounded-full font-semibold text-black bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-shadow duration-300 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aero-blue"
                            >
                                {t("profile.btnProducts")}
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </motion.button>
                        </Link>
                        <Link to="/applications">
                            <motion.button
                                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                                whileTap={reducedMotion ? {} : { scale: 0.97 }}
                                className="inline-flex items-center px-6 py-3 rounded-full font-medium text-gray-300 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                            >
                                {t("profile.btnApps")}
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={reducedMotion ? false : { x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <ParallaxImage
                        src="/images/about/company-profile.png"
                        alt={`${t("profile.title1")} ${t("profile.title2")}`}
                        reducedMotion={reducedMotion}
                    />
                </motion.div>
            </div>
        </section>
    );
};