import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface CardValue {
    icon: React.ElementType;
    title: string;
    desc: string;
    accent: string;
    stat: string;
    statLabel: string;
}

interface IsometricCardProps {
    val: CardValue;
    idx: number;
    reducedMotion?: boolean;
}

export const IsometricCard = ({ val, idx, reducedMotion = false }: IsometricCardProps) => {
    const Icon = val.icon;
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Lighter spring — less CPU on mobile
    const springConfig = { stiffness: 150, damping: 35 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], reducedMotion ? [0, 0] : [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-5, 5]), springConfig);

    const handleMouse = (e: React.MouseEvent) => {
        if (reducedMotion) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={reducedMotion ? false : { y: 40, opacity: 0 }}
            whileInView={reducedMotion ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "50px 0px" }}
            transition={{ delay: idx * 0.12, duration: 0.6 }}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={handleLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative h-full"
            >
                {/* Shadow glow */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        transform: "translateZ(-30px) translateY(10px)",
                        background: `${val.accent}12`,
                        filter: "blur(28px)",
                    }}
                    aria-hidden="true"
                />

                <div
                    className="relative rounded-3xl overflow-hidden h-full"
                    style={{
                        background: "#181826",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    {/* Top accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${val.accent}, transparent)` }}
                        aria-hidden="true"
                    />

                    {/* Ghost number */}
                    <div
                        className="absolute top-4 right-4 text-[80px] font-black leading-none pointer-events-none select-none"
                        style={{ color: `${val.accent}07` }}
                        aria-hidden="true"
                    >
                        {String(idx + 1).padStart(2, "0")}
                    </div>

                    <div className="relative p-7">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                            style={{
                                background: `linear-gradient(135deg, ${val.accent}20, ${val.accent}05)`,
                                border: `1px solid ${val.accent}30`,
                                boxShadow: `0 0 24px ${val.accent}12`,
                            }}
                            aria-hidden="true"
                        >
                            <Icon className="w-6 h-6" style={{ color: val.accent }} />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-5 group-hover:text-gray-400 transition-colors">{val.desc}</p>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-black" style={{ color: val.accent }} aria-label={`${val.stat} ${val.statLabel}`}>
                                {val.stat}
                            </span>
                            <div aria-hidden="true">
                                <div className="h-px w-8 mb-1" style={{ background: `${val.accent}40` }} />
                                <span className="text-[10px] text-gray-600 uppercase tracking-widest">{val.statLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};