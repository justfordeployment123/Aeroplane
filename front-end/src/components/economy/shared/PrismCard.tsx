import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface Pillar {
    icon: LucideIcon;
    title: string;
    desc: string;
    accent: string;
    stat: string;
    statLabel: string;
    backDetails: string[];
}

interface PrismCardProps {
    pillar: Pillar;
    idx: number;
    reducedMotion?: boolean;
}

export const PrismCard = ({ pillar, idx, reducedMotion = false }: PrismCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springCfg = { stiffness: 150, damping: 30 };
    const rotX = useSpring(useTransform(my, [-0.5, 0.5], reducedMotion ? [0, 0] : [6, -6]), springCfg);
    const rotY = useSpring(useTransform(mx, [-0.5, 0.5], reducedMotion ? [0, 0] : [-6, 6]), springCfg);

    const handleMove = (e: React.MouseEvent) => {
        if (reducedMotion) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => {
        mx.set(0);
        my.set(0);
    };

    const Icon = pillar.icon;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            initial={reducedMotion ? false : { y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "50px 0px" }}
            transition={{ delay: idx * 0.1, duration: 0.55 }}
            style={{ rotateX: rotX, rotateY: rotY, perspective: 800, transformStyle: "preserve-3d" } as React.CSSProperties}
            className="group relative rounded-3xl cursor-default"
            role="article"
            aria-label={pillar.title}
        >
            <div
                className="relative rounded-3xl p-7 sm:p-8 overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #202030 0%, #111119 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Hover glow border */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${pillar.accent}35, 0 20px 50px -15px ${pillar.accent}20` }}
                    aria-hidden="true"
                />
                {/* Top accent line */}
                <div
                    className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${pillar.accent}, transparent)` }}
                    aria-hidden="true"
                />
                {/* Ghost number */}
                <div
                    className="absolute top-2 right-4 text-[70px] font-black leading-none pointer-events-none select-none text-white/[0.025] group-hover:text-white/[0.05] transition-colors duration-700"
                    aria-hidden="true"
                >
                    {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="flex items-start gap-4 pb-12">
                    <div
                        className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                            background: `linear-gradient(135deg, ${pillar.accent}20, ${pillar.accent}07)`,
                            border: `1px solid ${pillar.accent}30`,
                            boxShadow: `0 0 20px ${pillar.accent}12`,
                        }}
                        aria-hidden="true"
                    >
                        <Icon className="w-5 h-5" style={{ color: pillar.accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{pillar.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 group-hover:text-gray-400 transition-colors">{pillar.desc}</p>
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{ background: `${pillar.accent}10`, border: `1px solid ${pillar.accent}25` }}
                            aria-label={`${pillar.stat} ${pillar.statLabel}`}
                        >
                            <span className="font-bold text-sm" style={{ color: pillar.accent }}>
                                {pillar.stat}
                            </span>
                            <span className="text-gray-400 text-xs">{pillar.statLabel}</span>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl px-7 sm:px-8 pb-5 pt-2">
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Features">
                        {pillar.backDetails.map((d, i) => (
                            <span
                                key={i}
                                role="listitem"
                                className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                                style={{ background: `${pillar.accent}12`, color: pillar.accent, border: `1px solid ${pillar.accent}28` }}
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
