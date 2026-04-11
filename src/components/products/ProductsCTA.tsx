import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ProductsCTAProps {
    reducedMotion?: boolean;
}

export const ProductsCTA = ({ reducedMotion = false }: ProductsCTAProps) => {
    const { t } = useTranslation("products");

    // Support both newline-split and plain title
    const rawTitle = t("cta.title");
    const [titleLine1, titleLine2] = rawTitle.includes("\n") ? rawTitle.split("\n") : [rawTitle, ""];

    return (
        <section className="py-24 sm:py-32 relative overflow-hidden border-t border-white/5" aria-labelledby="products-cta-heading">
            {/* Grid bg */}
            <div
                className="absolute inset-0 opacity-[0.018] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
                aria-hidden="true"
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-aero-blue/[0.05] rounded-full blur-[180px] pointer-events-none"
                aria-hidden="true"
            />

            <motion.div
                initial={reducedMotion ? false : { y: 22, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "50px 0px" }}
                className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto"
            >
                <h2 id="products-cta-heading" className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                    {titleLine1}
                    {titleLine2 && (
                        <>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{titleLine2}</span>
                        </>
                    )}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t("cta.subtitle")}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={reducedMotion ? {} : { scale: 1.04 }}
                        whileTap={reducedMotion ? {} : { scale: 0.97 }}
                        className="group px-9 py-3.5 bg-white text-black font-bold rounded-full hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aero-blue"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {t("cta.requestQuote")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </span>
                    </motion.button>
                    <Link to="/applications">
                        <motion.button
                            whileHover={reducedMotion ? {} : { scale: 1.03 }}
                            whileTap={reducedMotion ? {} : { scale: 0.97 }}
                            className="w-full sm:w-auto px-9 py-3.5 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                        >
                            {t("cta.viewApplications")}
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};
