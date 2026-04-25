import { motion } from "framer-motion";
import { TrendingUp, Plane, Building2, Network } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface EconomyStatsProps {
    reducedMotion?: boolean;
}

const STAT_ICONS = [TrendingUp, Plane, Building2, Network];

export const EconomyStats = ({ reducedMotion = false }: EconomyStatsProps) => {
    const { t } = useTranslation("economy");

    const stats = useMemo(() => {
        const raw = t("statsData", { returnObjects: true });
        const data = Array.isArray(raw) ? raw : [];
        return data.map((stat: any, idx: number) => ({
            ...stat,
            icon: STAT_ICONS[idx % STAT_ICONS.length],
        }));
    }, [t]);

    return (
        <section className="relative py-12 sm:py-14 overflow-hidden" aria-label="Key statistics">
            <div className="absolute inset-0 bg-gradient-to-r from-aero-blue/10 via-aero-purple/10 to-aero-blue/10" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#161622]/80 backdrop-blur-sm" aria-hidden="true" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/25 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/25 to-transparent" aria-hidden="true" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={reducedMotion ? false : { rotateX: -30, opacity: 0 }}
                                whileInView={{ rotateX: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "50px 0px" }}
                                transition={{ delay: idx * 0.08, duration: 0.55 }}
                                whileHover={reducedMotion ? {} : { scale: 1.04, transition: { duration: 0.18 } }}
                                className="text-center group"
                                style={{ perspective: 600 }}
                            >
                                <div
                                    className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-aero-blue/10 border border-aero-blue/20 text-aero-blue mb-3 group-hover:bg-aero-blue/18 transition-colors"
                                    aria-hidden="true"
                                >
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    <span className="block text-2xl sm:text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple mb-1">
                                        {stat.value}
                                    </span>
                                    <span className="text-gray-400 text-xs sm:text-sm tracking-wide">{stat.label}</span>
                                </dd>
                            </motion.div>
                        );
                    })}
                </dl>
            </div>
        </section>
    );
};