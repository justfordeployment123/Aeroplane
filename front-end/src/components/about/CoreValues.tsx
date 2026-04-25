import { motion } from "framer-motion";
import { Rocket, Eye, Users, Globe2 } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IsometricCard } from "./shared/IsometricCard";

interface CoreValuesProps {
    reducedMotion?: boolean;
}

export const CoreValues = ({ reducedMotion = false }: CoreValuesProps) => {
    const { t } = useTranslation("about");

    const coreValues = useMemo(
        () => [
            {
                icon: Rocket,
                title: t("values.items.sys.title"),
                desc: t("values.items.sys.desc"),
                accent: "#00d2ff",
                stat: "100%",
                statLabel: t("values.items.sys.statLabel"),
            },
            {
                icon: Eye,
                title: t("values.items.layout.title"),
                desc: t("values.items.layout.desc"),
                accent: "#10b981",
                stat: "11+",
                statLabel: t("values.items.layout.statLabel"),
            },
            {
                icon: Users,
                title: t("values.items.time.title"),
                desc: t("values.items.time.desc"),
                accent: "#a855f7",
                stat: "10W+",
                statLabel: t("values.items.time.statLabel"),
            },
            {
                icon: Globe2,
                title: t("values.items.cert.title"),
                desc: t("values.items.cert.desc"),
                accent: "#f97316",
                stat: "TC",
                statLabel: t("values.items.cert.statLabel"),
            },
        ],
        [t],
    );

    return (
        <section id="values" className="py-20 sm:py-24 relative overflow-hidden" style={{ background: "#111119" }} aria-labelledby="values-heading">
            {/* Dot grid bg */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,210,255,0.5) 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="text-center mb-16"
                >
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-3 block font-semibold">{t("values.tag")}</span>
                    <h2 id="values-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t("values.title1")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{t("values.title2")}</span>
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">{t("values.subtitle")}</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {coreValues.map((val, idx) => (
                        <IsometricCard key={idx} val={val} idx={idx} reducedMotion={reducedMotion} />
                    ))}
                </div>
            </div>
        </section>
    );
};
