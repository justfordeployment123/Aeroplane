import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const FLOATING_BADGES = [
    { x: "12%", y: "35%", text: "AOPA", delay: 0 },
    { x: "85%", y: "30%", text: "88-90%", delay: 1 },
    { x: "78%", y: "65%", text: "500+", delay: 2 },
];

interface TrainingHeroProps {
    reducedMotion?: boolean;
}

export const TrainingHero = ({ reducedMotion = false }: TrainingHeroProps) => {
    const { t } = useTranslation("training");

    // Split title: first word plain, rest gradient
    const titleWords = t("hero.title").split(" ");
    const titleFirst = titleWords[0];
    const titleRest = titleWords.slice(1).join(" ");

    return (
        <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden" aria-labelledby="training-hero-heading">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/banners/training-hero.png')",
                    filter: "brightness(0.2) saturate(1.3)",
                }}
                role="presentation"
                aria-hidden="true"
            />
            {/* Gradient overlay */}
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, #161622 10%, rgba(22,22,34,0.65) 55%, transparent 100%)" }}
                aria-hidden="true"
            />

            {/* Rings */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-aero-blue/[0.06] z-[1] pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-aero-purple/[0.06] z-[1] pointer-events-none"
                aria-hidden="true"
            />

            {/* Floating badges — desktop only, skip if reducedMotion */}
            {!reducedMotion && (
                <div className="absolute inset-0 z-[2] hidden lg:block pointer-events-none" aria-hidden="true">
                    {FLOATING_BADGES.map((badge, i) => (
                        <motion.div
                            key={i}
                            className="absolute px-3 py-1 rounded-full border border-aero-blue/20 bg-aero-card/80 backdrop-blur-sm text-[10px] font-mono text-aero-blue/60"
                            style={{ left: badge.x, top: badge.y }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: badge.delay }}
                        >
                            {badge.text}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
                <motion.div initial={reducedMotion ? false : { y: 26, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-card/80 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" aria-hidden="true" />
                        {t("hero.badge")}
                    </span>

                    <h1 id="training-hero-heading" className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-4">
                        {titleFirst} <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{titleRest}</span>
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-3">{t("hero.subtitle")}</p>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                aria-hidden="true"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{t("hero.scroll")}</span>
                <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
                    {!reducedMotion && (
                        <motion.div
                            className="w-1 h-1 bg-aero-blue rounded-full"
                            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </div>
            </motion.div>
        </section>
    );
};
