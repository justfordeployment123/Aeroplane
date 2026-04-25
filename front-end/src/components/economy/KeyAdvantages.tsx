import { motion } from "framer-motion";
import { Zap, Target, BarChart3 } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadarCard } from "./shared/RadarCard";
import type { Advantage } from "./shared/RadarCard";

interface KeyAdvantagesProps {
    reducedMotion?: boolean;
}

const ADV_ICONS = [Zap, Target, BarChart3];

export const KeyAdvantages = ({ reducedMotion = false }: KeyAdvantagesProps) => {
    const { t } = useTranslation("economy");

    const keyAdvantages: Advantage[] = useMemo(() => {
        const raw = t("advantages.items", { returnObjects: true });
        const items = Array.isArray(raw) ? raw : [];
        return items.map((item: any, idx: number) => ({
            ...item,
            icon: ADV_ICONS[idx % ADV_ICONS.length],
        }));
    }, [t]);

    return (
        <section className="py-20 sm:py-24 relative overflow-hidden" aria-labelledby="advantages-heading">
            <div
                className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-aero-blue/[0.05] rounded-full blur-[160px] pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={reducedMotion ? false : { y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="mb-12 sm:mb-16"
                >
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-3 block font-medium">
                        {t("advantages.tag")}
                    </span>
                    <h2 id="advantages-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        {t("advantages.title")}
                    </h2>
                    <div className="h-px w-14 mt-3 rounded-full bg-gradient-to-r from-aero-blue to-transparent" aria-hidden="true" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {keyAdvantages.map((adv, idx) => (
                        <RadarCard key={idx} adv={adv} idx={idx} reducedMotion={reducedMotion} />
                    ))}
                </div>
            </div>
        </section>
    );
};