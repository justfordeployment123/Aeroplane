import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface EconomyHeroProps {
    reducedMotion?: boolean;
}

export const EconomyHero = ({ reducedMotion = false }: EconomyHeroProps) => {
    const { t } = useTranslation("economy");
    const rawAltitudes = t("hero.altitudes", { returnObjects: true });
    const altitudes = Array.isArray(rawAltitudes) ? rawAltitudes : [];

    return (
        <section
            className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden"
            aria-labelledby="economy-hero-heading"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#161622] to-[#161622]" aria-hidden="true" />

            {/* Isometric lines */}
            {!reducedMotion && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ perspective: "800px" }}
                    aria-hidden="true"
                >
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                width: `${70 - i * 8}%`,
                                height: "1px",
                                background: `linear-gradient(90deg, transparent, rgba(0,210,255,${0.05 - i * 0.01}), transparent)`,
                                transform: `rotateX(65deg) translateZ(${i * 40}px) translateY(${i * 30 - 40}px)`,
                            }}
                            animate={{ opacity: [0.25, 0.5, 0.25] }}
                            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                        />
                    ))}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={`dot-${i}`}
                            className="absolute w-1.5 h-1.5 rounded-full bg-aero-blue"
                            style={{
                                transform: `rotateX(65deg) translateZ(${i * 40}px) translateY(${i * 30 - 40}px)`,
                                boxShadow: "0 0 6px rgba(0,210,255,0.5)",
                            }}
                            animate={{ x: ["-180px", "180px"] }}
                            transition={{ duration: 4 + i, repeat: Infinity, repeatType: "reverse", delay: i * 1.2, ease: "linear" }}
                        />
                    ))}
                </div>
            )}

            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,210,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
            />

            {/* Text */}
            <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
                <motion.div
                    initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/50 bg-aero-blue/10 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" aria-hidden="true" />
                        {t("hero.badge")}
                    </span>

                    <h1
                        id="economy-hero-heading"
                        className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-5 leading-tight"
                    >
                        {t("hero.title1")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("hero.title2")}
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        {t("hero.subtitle")}
                    </p>
                </motion.div>
            </div>

            {/* Altitude labels — desktop only */}
            <div
                className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-10 text-[10px] uppercase tracking-[0.3em] text-gray-600 pointer-events-none"
                aria-hidden="true"
            >
                {altitudes.map((alt: string, i: number) => (
                    <motion.div
                        key={alt}
                        initial={reducedMotion ? false : { x: 16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 + i * 0.12 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-8 h-px bg-gray-700" />
                        <span>{alt}</span>
                    </motion.div>
                ))}
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