import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ProductsHeroProps {
    reducedMotion?: boolean;
}

export const ProductsHero = ({ reducedMotion = false }: ProductsHeroProps) => {
    const { t } = useTranslation("products");

    const titleWords = t("hero.title").split(" ");
    const titleFirst = titleWords[0];
    const titleRest = titleWords.slice(1).join(" ");

    return (
        <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden" aria-labelledby="products-hero-heading">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/banners/products-hero.jpg')",
                    filter: "brightness(0.22) saturate(1.3)",
                }}
                role="presentation"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, #161622 8%, rgba(22,22,34,0.68) 50%, transparent 100%)" }}
                aria-hidden="true"
            />

            {/* Corner brackets — desktop only */}
            <div
                className="absolute top-24 left-8 w-20 h-20 border-t border-l border-aero-blue/20 hidden lg:block pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute top-24 right-8 w-20 h-20 border-t border-r border-aero-blue/20 hidden lg:block pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-16 left-8 w-20 h-20 border-b border-l border-aero-blue/20 hidden lg:block pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-16 right-8 w-20 h-20 border-b border-r border-aero-blue/20 hidden lg:block pointer-events-none"
                aria-hidden="true"
            />

            {/* HUD labels — desktop only */}
            <div
                className="absolute top-28 left-12 text-[10px] text-aero-blue/38 font-mono space-y-1 hidden lg:block pointer-events-none"
                aria-hidden="true"
            >
                <div>SYS.STATUS: ONLINE</div>
                <div>FLEET.COUNT: 11</div>
                <div>CAT.LOADED: 04</div>
            </div>
            {!reducedMotion && (
                <div
                    className="absolute top-28 right-12 text-[10px] text-aero-blue/38 font-mono text-right hidden lg:block pointer-events-none"
                    aria-hidden="true"
                >
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                        SCANNING...
                    </motion.div>
                </div>
            )}

            {/* Scan line — skip if reducedMotion */}
            {!reducedMotion && (
                <motion.div
                    className="absolute left-0 right-0 h-[1px] z-[2] pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 5%, rgba(0,210,255,0.25) 30%, rgba(0,210,255,0.45) 50%, rgba(0,210,255,0.25) 70%, transparent 95%)",
                    }}
                    animate={{ top: ["20%", "80%", "20%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    aria-hidden="true"
                />
            )}

            {/* Content */}
            <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
                <motion.div initial={reducedMotion ? false : { y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.85 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-card/80 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" aria-hidden="true" />
                        {t("hero.tag")}
                    </span>
                    <h1 id="products-hero-heading" className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none">
                        {titleFirst} <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">{titleRest}</span>
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg max-w-lg mx-auto mt-3">{t("hero.subtitle")}</p>
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
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
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
