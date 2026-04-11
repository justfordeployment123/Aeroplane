import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DepthTimelineItem } from "./shared/DepthTimelineItem";
import type { TimelineItemType } from "./shared/DepthTimelineItem";

interface PolicyTimelineProps {
    reducedMotion?: boolean;
}

export const PolicyTimeline = ({ reducedMotion = false }: PolicyTimelineProps) => {
    const { t } = useTranslation("economy");

    const policyTimeline: TimelineItemType[] = useMemo(() => {
        const raw = t("timeline.items", { returnObjects: true });
        return Array.isArray(raw) ? raw : [];
    }, [t]);

    return (
        <section
            className="py-20 sm:py-24 relative overflow-hidden border-t border-white/5"
            style={{ background: "#111119" }}
            aria-labelledby="timeline-heading"
        >
            <div
                className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-aero-purple/[0.05] rounded-full blur-[180px] pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="text-center mb-14 sm:mb-20"
                >
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-3 block font-medium">
                        {t("timeline.tag")}
                    </span>
                    <h2 id="timeline-heading" className="text-4xl md:text-5xl font-bold text-white">
                        {t("timeline.title1")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("timeline.title2")}
                        </span>
                    </h2>
                </motion.div>

                <ol className="space-y-10 sm:space-y-12" aria-label={t("timeline.tag")}>
                    {policyTimeline.map((item, idx) => (
                        <DepthTimelineItem
                            key={idx}
                            item={item}
                            idx={idx}
                            isLast={idx === policyTimeline.length - 1}
                            reducedMotion={reducedMotion}
                        />
                    ))}
                </ol>
            </div>
        </section>
    );
};