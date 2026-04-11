import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface VisionSectionProps {
    reducedMotion?: boolean;
}

export const VisionSection = ({ reducedMotion = false }: VisionSectionProps) => {
    const { t } = useTranslation("about");

    return (
        <section id="vision" className="py-20 sm:py-24 relative overflow-hidden" style={{ background: "#111119" }} aria-labelledby="vision-heading">
            {/* Spoke lines */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
                    {[0, 45, 90, 135].map((deg) => (
                        <div
                            key={deg}
                            className="absolute top-1/2 left-1/2 w-full h-[1px] opacity-[0.03]"
                            style={{
                                transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                                background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.5), transparent)",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
                <motion.div
                    initial={reducedMotion ? false : { y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="mb-14"
                >
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-3 block font-semibold">{t("vision.tag")}</span>
                    <h2 id="vision-heading" className="text-4xl md:text-5xl font-bold mb-0">
                        {t("vision.title1")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t("vision.title2")}</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={reducedMotion ? false : { y: 40, scale: 0.97, opacity: 0 }}
                    whileInView={{ y: 0, scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    transition={{ duration: 0.8 }}
                    className="relative inline-block max-w-5xl mx-auto w-full"
                    style={{ perspective: "1200px" }}
                >
                    <motion.div
                        whileHover={reducedMotion ? {} : { rotateX: -2, rotateY: 1.5, scale: 1.015 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div
                            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-aero-blue/10 via-aero-purple/5 to-aero-blue/10 blur-xl opacity-50 pointer-events-none"
                            aria-hidden="true"
                        />
                        <div
                            className="relative rounded-3xl overflow-hidden p-[2px]"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,210,255,0.2), rgba(168,85,247,0.1), rgba(0,210,255,0.2))",
                            }}
                        >
                            <div className="rounded-[22px] overflow-hidden bg-[#161622]">
                                <img
                                    src="/images/about/vision.png"
                                    alt={`${t("vision.title1")} ${t("vision.title2")}`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
