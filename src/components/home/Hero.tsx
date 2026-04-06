import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ParticleBackground } from "./ParticleBackground";

const wordAnimation = {
    hidden: { y: 20, filter: "blur(8px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
};

const AnimatedText = ({ text, className }: { text: string; className?: string }) => (
    <span className={className}>
        {text.split(" ").map((word, i) => (
            <motion.span key={i} custom={i} variants={wordAnimation} initial="hidden" animate="visible" className="inline-block mr-[0.3em]">
                {word}
            </motion.span>
        ))}
    </span>
);

export const Hero = () => {
    const { t } = useTranslation("home");

    const statIcons = [
        <Navigation className="w-4 h-4" />,
        <Zap className="w-4 h-4" />,
        <Shield className="w-4 h-4" />,
    ];

    const statsKeys = ["range", "payload", "flightHours"] as const;

    // Split title: first 2 words on line 1, rest on line 2
    const titleWords = t("hero.title").split(" ");
    const line1 = titleWords.slice(0, 2).join(" ");
    const line2 = titleWords.slice(2).join(" ");

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover z-0">
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-aero-darker/30 z-[1]" />
            <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-linear-to-t from-aero-dark/80 via-transparent to-transparent z-[1]" />

            <div className="absolute inset-0 z-[2]">
                <ParticleBackground particleCount={40} connectionDistance={120} />
            </div>

            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-aero-blue/10 rounded-full blur-[200px] pointer-events-none z-[1]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-aero-purple/8 rounded-full blur-[180px] pointer-events-none z-[1]" />

            <div
                className="absolute inset-0 z-[2] opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,210,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center flex flex-col items-center">
                <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
                    <span className="px-4 py-1.5 rounded-full border border-aero-blue/50 bg-aero-blue/10 text-aero-blue text-sm font-medium tracking-wide mb-6 inline-flex items-center gap-2 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                        {t("hero.badge")}
                    </span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-white leading-tight mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                    <AnimatedText text={line1} />
                    <br />
                    <span className="text-white">
                        <AnimatedText text={line2} />
                    </span>
                </h1>

                <motion.p
                    initial={{ y: 30 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed drop-shadow-lg"
                >
                    {t("hero.subtitle")}
                </motion.p>

                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10"
                >
                    {statsKeys.map((key, i) => (
                        <div
                            key={key}
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-aero-card/80 backdrop-blur-sm border border-white/[0.08]"
                        >
                            <div className="w-8 h-8 rounded-lg bg-aero-blue/10 border border-aero-blue/20 flex items-center justify-center text-aero-blue">
                                {statIcons[i]}
                            </div>
                            <div className="text-left">
                                <div className="text-white font-bold text-sm drop-shadow-lg">{t(`hero.stats.${key}.value`)}</div>
                                <div className="text-gray-400 text-xs">{t(`hero.stats.${key}.label`)}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ y: 30 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <Link to="/products">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-aero-blue/20 border border-aero-blue rounded-full hover:bg-aero-blue hover:text-black overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_40px_rgba(0,210,255,0.6)]"
                        >
                            <motion.span
                                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            />
                            <span className="relative flex items-center">
                                {t("hero.cta.explore")}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                    </Link>
                    <Link to="/about">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center justify-center px-8 py-4 font-medium text-gray-200 hover:text-white transition-all duration-300 border border-white/15 rounded-full hover:border-white/30 backdrop-blur-sm"
                        >
                            {t("hero.cta.about")}
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" transition={{ delay: 2 }}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{t("hero.scroll")}</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
                        <motion.div
                            className="w-1 h-1 bg-aero-blue rounded-full"
                            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};