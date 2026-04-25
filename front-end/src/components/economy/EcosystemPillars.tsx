import { motion } from "framer-motion";
import { Truck, Shield, Building2, Globe2 } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PrismCard } from "./shared/PrismCard";
import type { Pillar } from "./shared/PrismCard";

interface EcosystemPillarsProps {
    reducedMotion?: boolean;
}

const PILLAR_ICONS = [Truck, Shield, Building2, Globe2];
const PILLAR_ACCENTS = ["#00d2ff", "#f97316", "#a855f7", "#10b981"];
const PILLAR_STATS = ["3-Tier", "3D", "11+", "24/7"];

export const EcosystemPillars = ({ reducedMotion = false }: EcosystemPillarsProps) => {
    const { t } = useTranslation("economy");

    const ecosystemPillars: Pillar[] = useMemo(() => {
        const raw = t("pillars.items", { returnObjects: true });
        const items = Array.isArray(raw) ? raw : [];
        return items.map((item: any, idx: number) => ({
            ...item,
            icon: PILLAR_ICONS[idx % PILLAR_ICONS.length],
            accent: PILLAR_ACCENTS[idx % PILLAR_ACCENTS.length],
            stat: PILLAR_STATS[idx % PILLAR_STATS.length],
            backDetails: Array.isArray(item.backDetails) ? item.backDetails : [],
        }));
    }, [t]);

    return (
        <section
            className="py-20 sm:py-24 relative overflow-hidden border-t border-white/5"
            style={{ background: "#111119" }}
            aria-labelledby="pillars-heading"
        >
            {/* Hex grid bg */}
            <div
                className="absolute inset-0 opacity-[0.018] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(30deg, rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(150deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 35px",
                }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-aero-purple/[0.05] rounded-full blur-[180px] pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="text-center mb-14 sm:mb-20"
                >
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-3 block font-medium">
                        {t("pillars.tag")}
                    </span>
                    <h2 id="pillars-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t("pillars.title1")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("pillars.title2")}
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
                        {t("pillars.subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {ecosystemPillars.map((pillar, idx) => (
                        <PrismCard key={idx} pillar={pillar} idx={idx} reducedMotion={reducedMotion} />
                    ))}
                </div>
            </div>
        </section>
    );
};