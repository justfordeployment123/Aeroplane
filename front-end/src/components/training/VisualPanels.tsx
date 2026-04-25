import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface PanelItem {
    title: string;
    sub: string;
}

const PANEL_CONFIG = [
    { accent: "#00d2ff", img: "/images/training/service-process.jpg" },
    { accent: "#a855f7", img: "/images/training/certification.jpg" },
];

interface VisualPanelsProps {
    reducedMotion?: boolean;
}

export const VisualPanels = ({ reducedMotion = false }: VisualPanelsProps) => {
    const { t } = useTranslation("training");
    const panels = t("panels", { returnObjects: true }) as PanelItem[];

    return (
        <section className="py-20 sm:py-24" aria-label="Training panels">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {panels.map((panel, i) => {
                    const cfg = PANEL_CONFIG[i];
                    return (
                        <motion.article
                            key={i}
                            initial={reducedMotion ? false : { y: 32, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "50px 0px" }}
                            transition={{ delay: i * 0.12, duration: 0.65 }}
                            className="group"
                            style={{ perspective: "1000px" }}
                            aria-labelledby={`panel-title-${i}`}
                        >
                            <motion.div
                                whileHover={reducedMotion ? {} : { rotateY: i === 0 ? 2.5 : -2.5, rotateX: -1.5, scale: 1.01 }}
                                transition={{ duration: 0.35 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Sub label + line */}
                                <div className="flex items-center gap-4 mb-4">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: cfg.accent }}>
                                        {panel.sub}
                                    </p>
                                    <div
                                        className="h-px flex-1"
                                        style={{ background: `linear-gradient(to right, ${cfg.accent}38, transparent)` }}
                                        aria-hidden="true"
                                    />
                                </div>

                                {/* Card */}
                                <div
                                    className="relative rounded-3xl overflow-hidden"
                                    style={{
                                        border: `1px solid ${cfg.accent}15`,
                                        boxShadow: `0 28px 55px -15px rgba(0,0,0,0.55), 0 0 35px -10px ${cfg.accent}08`,
                                    }}
                                >
                                    <div
                                        className="absolute top-0 inset-x-0 h-[1px]"
                                        style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}38, transparent)` }}
                                        aria-hidden="true"
                                    />
                                    <div className="p-5 sm:p-6 bg-[#1c1c2a]">
                                        <h2 id={`panel-title-${i}`} className="text-xl sm:text-2xl font-bold text-white mb-4">
                                            {panel.title}
                                        </h2>
                                        <img src={cfg.img} alt={panel.title} loading="lazy" decoding="async" className="w-full h-auto rounded-xl" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
};
