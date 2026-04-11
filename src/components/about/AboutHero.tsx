import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const DOTS = [
    { x: "15%", y: "30%", delay: 0 },
    { x: "80%", y: "25%", delay: 1.5 },
    { x: "70%", y: "65%", delay: 0.8 },
    { x: "25%", y: "70%", delay: 2.2 },
];

interface AboutHeroProps {
    reducedMotion?: boolean;
}

export const AboutHero = ({ reducedMotion = false }: AboutHeroProps) => {
    const { t } = useTranslation("about");

    return (
        <section
            className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden"
            aria-labelledby="about-hero-heading"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/banners/about-hero.jpg')",
                    filter: "brightness(0.22) saturate(1.2)",
                }}
                role="presentation"
                aria-hidden="true"
            />

            {/* Fade edges */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#161622] to-transparent z-[2]" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#161622] to-transparent z-[2]" aria-hidden="true" />

            {/* Scan line — skipped if reducedMotion */}
            {!reducedMotion && (
                <motion.div
                    className="absolute top-1/2 left-0 right-0 h-[1px] z-[3]"
                    style={{
                        background: "linear-gradient(90deg, transparent 10%, rgba(0,210,255,0.35) 30%, rgba(168,85,247,0.25) 50%, rgba(0,210,255,0.35) 70%, transparent 90%)",
                    }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 4 }}
                    aria-hidden="true"
                />
            )}

            {/* Ambient dots — skipped if reducedMotion */}
            {!reducedMotion && (
                <div className="absolute inset-0 z-[2]" aria-hidden="true">
                    {DOTS.map((dot, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-aero-blue/40 rounded-full"
                            style={{ left: dot.x, top: dot.y }}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, delay: dot.delay }}
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-aero-blue/30 bg-aero-card/80 text-aero-blue text-sm font-medium tracking-wide mb-8 backdrop-blur-md"
                        initial={reducedMotion ? false : { scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" aria-hidden="true" />
                        {t("hero.badge")}
                    </motion.span>

                    <h1 id="about-hero-heading" className="text-5xl md:text-7xl font-extrabold tracking-tight mb-5">
                        <motion.span
                            className="inline-block"
                            initial={reducedMotion ? false : { y: 32, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            {t("hero.title1")}
                        </motion.span>{" "}
                        <motion.span
                            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple"
                            initial={reducedMotion ? false : { y: 32, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.35, duration: 0.7 }}
                        >
                            {t("hero.title2")}
                        </motion.span>
                    </h1>

                    <motion.p
                        className="text-lg text-gray-300 max-w-2xl mx-auto"
                        initial={reducedMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {t("hero.subtitle")}
                    </motion.p>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
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