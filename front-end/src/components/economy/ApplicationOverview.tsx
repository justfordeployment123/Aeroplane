import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ApplicationOverviewProps {
    reducedMotion?: boolean;
}

export const ApplicationOverview = ({ reducedMotion = false }: ApplicationOverviewProps) => {
    const { t } = useTranslation("economy");

    return (
        <section className="py-20 sm:py-24 relative overflow-hidden" aria-labelledby="overview-heading">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-aero-blue/[0.05] rounded-full blur-[180px] pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="relative rounded-3xl p-8 sm:p-10 md:p-16 text-center overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, rgba(0,210,255,0.05) 0%, rgba(168,85,247,0.03) 100%)",
                        border: "1px solid rgba(0,210,255,0.14)",
                        boxShadow: "0 0 50px rgba(0,210,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                >
                    {/* Corner brackets */}
                    {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((cls, i) => (
                        <div key={i} className={`absolute w-5 h-5 sm:w-6 sm:h-6 ${cls} border-aero-blue/28`} aria-hidden="true" />
                    ))}

                    <div
                        className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-aero-blue/10 border border-aero-blue/22 mb-5"
                        aria-hidden="true"
                    >
                        <Globe2 className="w-6 h-6 sm:w-7 sm:h-7 text-aero-blue" />
                    </div>

                    <h2 id="overview-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
                        {t("overview.title")}
                    </h2>
                    <div className="h-1 w-14 bg-gradient-to-r from-aero-blue to-aero-purple mx-auto rounded-full mb-7" aria-hidden="true" />
                    <p className="text-base sm:text-lg text-gray-300 leading-loose">
                        {t("overview.desc")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};