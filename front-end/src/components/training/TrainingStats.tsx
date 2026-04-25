import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StatItem {
    value: string;
    label: string;
}

const STATS_ICONS = [Award, ShieldCheck, CheckCircle2, Clock];

interface TrainingStatsProps {
    reducedMotion?: boolean;
}

export const TrainingStats = ({ reducedMotion = false }: TrainingStatsProps) => {
    const { t } = useTranslation("training");
    const stats = t("stats", { returnObjects: true }) as StatItem[];

    return (
        <section className="relative py-14 sm:py-16 overflow-hidden" aria-label="Training statistics">
            <div className="absolute inset-0 bg-gradient-to-r from-aero-blue/5 via-transparent to-aero-purple/5" aria-hidden="true" />
            <div
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/25 to-transparent"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/25 to-transparent"
                aria-hidden="true"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, i) => {
                        const Icon = STATS_ICONS[i % STATS_ICONS.length];
                        return (
                            <motion.div
                                key={i}
                                initial={reducedMotion ? false : { scale: 0.85, rotateY: -16, opacity: 0 }}
                                whileInView={{ scale: 1, rotateY: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "50px 0px" }}
                                transition={{ delay: i * 0.08, duration: 0.55 }}
                                className="text-center group"
                                style={{ perspective: "600px" }}
                            >
                                <motion.div
                                    whileHover={reducedMotion ? {} : { rotateY: 8, scale: 1.04 }}
                                    transition={{ duration: 0.25 }}
                                    className="relative rounded-2xl p-5 sm:p-6"
                                    style={{
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    <Icon
                                        size={18}
                                        className="mx-auto mb-3 text-aero-blue/55 group-hover:text-aero-blue transition-colors"
                                        aria-hidden="true"
                                    />
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd>
                                        <span className="block text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</span>
                                        <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">{stat.label}</span>
                                    </dd>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </dl>
            </div>
        </section>
    );
};
