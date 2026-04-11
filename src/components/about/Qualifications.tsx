import { motion } from "framer-motion";
import { Award, ShieldCheck, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlipCard } from "./shared/FlipCard";

interface QualificationsProps {
    reducedMotion?: boolean;
}

export const Qualifications = ({ reducedMotion = false }: QualificationsProps) => {
    const { t } = useTranslation("about");

    const rawQuals = t("qualifications", { returnObjects: true });
    const rawHonors = t("honorsList", { returnObjects: true });
    const qualifications = Array.isArray(rawQuals) ? rawQuals : [];
    const honors = Array.isArray(rawHonors) ? rawHonors : [];

    const certificates = useMemo(
        () => [
            { title: t("recognition.certs.items.cert1"), img: "/images/about/cert-1.png" },
            { title: t("recognition.certs.items.cert2"), img: "/images/about/cert-2.png" },
            { title: t("recognition.certs.items.cert3"), img: "/images/about/cert-3.png" },
            { title: t("recognition.certs.items.cert4"), img: "/images/about/cert-4.jpg" },
            { title: t("recognition.certs.items.cert5"), img: "/images/about/cert-5.png" },
            { title: t("recognition.certs.items.cert6"), img: "/images/about/cert-6.png" },
        ],
        [t],
    );

    return (
        <section id="honors" className="py-20 sm:py-24 relative overflow-hidden" aria-labelledby="recognition-heading">
            <div
                className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-aero-purple/[0.05] rounded-full blur-[180px] pointer-events-none -translate-y-1/2"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={reducedMotion ? false : { y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="mb-14"
                >
                    <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                        <div className="h-px w-10 bg-gradient-to-r from-aero-blue to-transparent" />
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("recognition.tag")}</span>
                    </div>
                    <h2 id="recognition-heading" className="text-4xl md:text-5xl font-bold">
                        {t("recognition.title1")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("recognition.title2")}
                        </span>
                    </h2>
                </motion.div>

                {/* Two lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
                    {/* Qualifications */}
                    <motion.div
                        initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "50px 0px" }}
                        className="relative rounded-3xl p-7 overflow-hidden"
                        style={{
                            background: "linear-gradient(160deg, #181826 0%, #111119 100%)",
                            border: "1px solid rgba(0,210,255,0.1)",
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/40 to-transparent"
                            aria-hidden="true"
                        />

                        <div className="flex items-center gap-3 mb-7">
                            <div
                                className="w-11 h-11 rounded-xl bg-aero-blue/10 border border-aero-blue/25 flex items-center justify-center"
                                aria-hidden="true"
                            >
                                <ShieldCheck className="w-5 h-5 text-aero-blue" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{t("recognition.industry.title")}</h3>
                                <p className="text-xs text-gray-600">
                                    {qualifications.length} {t("recognition.industry.subtitle")}
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-2.5" aria-label={t("recognition.industry.title")}>
                            {qualifications.map((item: string, i: number) => (
                                <motion.li
                                    key={i}
                                    initial={reducedMotion ? false : { x: -16, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "50px 0px" }}
                                    transition={{ delay: i * 0.04 }}
                                    className="flex items-start text-gray-400 text-sm group/item hover:text-gray-200 transition-colors"
                                >
                                    <ChevronRight
                                        className="w-4 h-4 text-aero-blue/50 mr-2 shrink-0 mt-0.5 group-hover/item:text-aero-blue transition-colors"
                                        aria-hidden="true"
                                    />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Honors */}
                    <motion.div
                        initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "50px 0px" }}
                        transition={{ delay: 0.12 }}
                        className="relative rounded-3xl p-7 overflow-hidden"
                        style={{
                            background: "linear-gradient(160deg, #181826 0%, #111119 100%)",
                            border: "1px solid rgba(168,85,247,0.1)",
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-purple/40 to-transparent"
                            aria-hidden="true"
                        />

                        <div className="flex items-center gap-3 mb-7">
                            <div
                                className="w-11 h-11 rounded-xl bg-aero-purple/10 border border-aero-purple/25 flex items-center justify-center"
                                aria-hidden="true"
                            >
                                <Award className="w-5 h-5 text-aero-purple" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{t("recognition.enterprise.title")}</h3>
                                <p className="text-xs text-gray-600">
                                    {honors.length} {t("recognition.enterprise.subtitle")}
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-2.5" aria-label={t("recognition.enterprise.title")}>
                            {honors.map((item: string, i: number) => (
                                <motion.li
                                    key={i}
                                    initial={reducedMotion ? false : { x: -16, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "50px 0px" }}
                                    transition={{ delay: i * 0.04 }}
                                    className="flex items-start text-gray-400 text-sm group/item hover:text-gray-200 transition-colors"
                                >
                                    <ChevronRight
                                        className="w-4 h-4 text-aero-purple/50 mr-2 shrink-0 mt-0.5 group-hover/item:text-aero-purple transition-colors"
                                        aria-hidden="true"
                                    />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Certificates */}
                <motion.div
                    initial={reducedMotion ? false : { y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="mb-6"
                >
                    <h3 className="text-xl font-bold text-white mb-1">{t("recognition.certs.title")}</h3>
                    <p className="text-sm text-gray-600">{t("recognition.certs.subtitle")}</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" role="list" aria-label={t("recognition.certs.title")}>
                    {certificates.map((cert, idx) => (
                        <div key={idx} role="listitem">
                            <FlipCard cert={cert} idx={idx} reducedMotion={reducedMotion} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
