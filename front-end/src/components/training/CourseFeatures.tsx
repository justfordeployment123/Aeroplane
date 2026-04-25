import { motion } from "framer-motion";
import { Calendar, Users, GraduationCap, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FeatureCard3D } from "./shared/FeatureCard3D";
import type { FeatureItem, FeatureConfig } from "./shared/FeatureCard3D";

const FEATURE_CONFIG: FeatureConfig[] = [
    { icon: Calendar, accent: "#00d2ff" },
    { icon: Users, accent: "#a855f7" },
    { icon: GraduationCap, accent: "#10b981" },
    { icon: TrendingUp, accent: "#f97316" },
];

interface CourseFeaturesProps {
    reducedMotion?: boolean;
}

export const CourseFeatures = ({ reducedMotion = false }: CourseFeaturesProps) => {
    const { t } = useTranslation("training");
    const features = t("features.items", { returnObjects: true }) as FeatureItem[];

    return (
        <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: "#111119" }} aria-labelledby="features-heading">
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,210,255,0.5) 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={reducedMotion ? false : { y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="mb-12 sm:mb-16"
                >
                    <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                        <div className="h-px w-10 bg-gradient-to-r from-aero-blue to-transparent" />
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">{t("features.tag")}</span>
                    </div>
                    <h2 id="features-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {t("features.title")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("features.titleHighlight")}
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {features.map((feature, idx) => (
                        <FeatureCard3D
                            key={idx}
                            feature={feature}
                            config={FEATURE_CONFIG[idx % FEATURE_CONFIG.length]}
                            idx={idx}
                            reducedMotion={reducedMotion}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
