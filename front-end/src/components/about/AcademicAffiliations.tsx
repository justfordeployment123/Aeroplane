import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface AcademicItem {
    type: string;
    name: string;
    detail: string;
}

interface AcademicAffiliationsProps {
    reducedMotion?: boolean;
}

export const AcademicAffiliations = ({ reducedMotion = false }: AcademicAffiliationsProps) => {
    const { t } = useTranslation("about");

    const rawAcademic = t("academic.items", { returnObjects: true });
    const academicAffiliations: AcademicItem[] = Array.isArray(rawAcademic) ? rawAcademic : [];

    return (
        <section className="py-20 sm:py-24 relative overflow-hidden" aria-labelledby="academic-heading">
            <div
                className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-aero-blue/[0.04] rounded-full blur-[180px] pointer-events-none -translate-y-1/2"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={reducedMotion ? false : { y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="mb-14"
                >
                    <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                        <div className="h-px w-10 bg-gradient-to-r from-aero-blue to-transparent" />
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("academic.tag")}</span>
                    </div>
                    <h2 id="academic-heading" className="text-4xl md:text-5xl font-bold">
                        {t("academic.title1")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t("academic.title2")}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {academicAffiliations.map((item, idx) => (
                        <motion.article
                            key={idx}
                            initial={reducedMotion ? false : { y: 18, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "50px 0px" }}
                            transition={{ delay: idx * 0.05 }}
                            className="group rounded-2xl p-6 border border-white/[0.06] hover:border-aero-blue/20 transition-colors duration-400 focus-within:border-aero-blue/30"
                            style={{ background: "linear-gradient(160deg, #1c1c2a 0%, #161622 100%)" }}
                        >
                            <span className="text-[10px] font-bold tracking-widest uppercase text-aero-blue/60 mb-2.5 block">{item.type}</span>
                            <h4 className="text-white font-bold mb-1 group-hover:text-aero-blue transition-colors text-sm sm:text-base">
                                {item.name}
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
