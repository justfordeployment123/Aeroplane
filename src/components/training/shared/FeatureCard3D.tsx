import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
    title: string;
    desc: string;
}

export interface FeatureConfig {
    icon: LucideIcon;
    accent: string;
}

interface FeatureCard3DProps {
    feature: FeatureItem;
    config: FeatureConfig;
    idx: number;
    reducedMotion?: boolean;
}

export const FeatureCard3D = ({ feature, config, idx, reducedMotion = false }: FeatureCard3DProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springCfg = { stiffness: 150, damping: 30 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], reducedMotion ? [0, 0] : [6, -6]), springCfg);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-6, 6]), springCfg);
    const Icon = config.icon;

    const handleMouse = (e: React.MouseEvent) => {
        if (reducedMotion) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            initial={reducedMotion ? false : { y: 36, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "50px 0px" }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={() => {
                    mouseX.set(0);
                    mouseY.set(0);
                }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative h-full"
                role="article"
                aria-label={feature.title}
            >
                <div
                    className="relative rounded-3xl overflow-hidden h-full"
                    style={{ background: "#181826", border: `1px solid ${config.accent}15` }}
                >
                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${config.accent}, transparent)` }}
                        aria-hidden="true"
                    />
                    {/* Ghost number */}
                    <div
                        className="absolute top-4 right-5 text-[70px] font-black leading-none pointer-events-none select-none"
                        style={{ color: `${config.accent}06` }}
                        aria-hidden="true"
                    >
                        {String(idx + 1).padStart(2, "0")}
                    </div>

                    <div className="relative p-7 sm:p-8">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                            style={{
                                background: `linear-gradient(135deg, ${config.accent}20, ${config.accent}05)`,
                                border: `1px solid ${config.accent}30`,
                                boxShadow: `0 0 24px ${config.accent}12`,
                            }}
                            aria-hidden="true"
                        >
                            <Icon className="w-6 h-6" style={{ color: config.accent }} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">{feature.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{feature.desc}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
