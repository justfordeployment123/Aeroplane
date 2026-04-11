import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface FlipCardProps {
    cert: { title: string; img: string };
    idx: number;
    reducedMotion?: boolean;
}

export const FlipCard = ({ cert, idx, reducedMotion = false }: FlipCardProps) => {
    const [flipped, setFlipped] = useState(false);
    const { t } = useTranslation("about");

    const flip = useCallback(() => setFlipped((f) => !f), []);
    const unflip = useCallback(() => setFlipped(false), []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip();
        }
        if (e.key === "Escape") unflip();
    };

    return (
        <motion.div
            initial={reducedMotion ? false : { rotateY: -20, opacity: 0 }}
            whileInView={reducedMotion ? {} : { rotateY: 0, opacity: 1 }}
            viewport={{ once: true, margin: "50px 0px" }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="cursor-pointer focus-within:outline-none"
            style={{ perspective: "800px" }}
            onClick={flip}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={unflip}
            tabIndex={0}
            role="button"
            aria-pressed={flipped}
            aria-label={`${cert.title} — ${t("recognition.certs.hoverText")}`}
            onKeyDown={handleKeyDown}
        >
            <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
            >
                {/* Front */}
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        background: "linear-gradient(160deg, #202030 0%, #111119 100%)",
                        border: "1px solid rgba(255,255,255,0.07)",
                    }}
                >
                    <div className="aspect-[4/3] p-4 flex items-center justify-center">
                        <img
                            src={cert.img}
                            alt={cert.title}
                            loading="lazy"
                            decoding="async"
                            className="max-h-full max-w-full object-contain drop-shadow-md"
                        />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#202030] to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-2 inset-x-0 text-center">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider" aria-hidden="true">
                            {t("recognition.certs.hoverText")}
                        </span>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 text-center"
                    aria-hidden={!flipped}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "linear-gradient(160deg, rgba(0,210,255,0.12) 0%, rgba(168,85,247,0.08) 100%)",
                        border: "1px solid rgba(0,210,255,0.3)",
                        boxShadow: "0 0 30px rgba(0,210,255,0.1)",
                    }}
                >
                    <ShieldCheck className="w-6 h-6 text-aero-blue mb-3" aria-hidden="true" />
                    <p className="text-xs text-white font-semibold leading-snug">{cert.title}</p>
                    <div className="mt-2 w-8 h-[1px] bg-gradient-to-r from-transparent via-aero-blue to-transparent" aria-hidden="true" />
                    <span className="mt-2 text-[10px] text-aero-blue/70 uppercase tracking-widest">
                        {t("recognition.certs.verified")}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};