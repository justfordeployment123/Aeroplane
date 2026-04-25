import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface TimelineItemType {
    year: string;
    title: string;
    desc: string;
}

interface DepthTimelineItemProps {
    item: TimelineItemType;
    idx: number;
    isLast: boolean;
    reducedMotion?: boolean;
}

export const DepthTimelineItem = ({ item, idx, isLast, reducedMotion = false }: DepthTimelineItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

    // Only wire up scroll transforms when motion is allowed
    const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.35, 1], reducedMotion ? [1, 1, 1] : [0, 1, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity, perspective: 600 }}
            className="relative"
            role="listitem"
        >
            <div className="flex items-center gap-5 sm:gap-8 md:gap-10">
                {/* Year circle */}
                <div className="relative shrink-0" aria-hidden="true">
                    <motion.div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                        style={{
                            background: "radial-gradient(circle at 30% 30%, rgba(0,210,255,0.18), rgba(0,210,255,0.03))",
                            border: "2px solid rgba(0,210,255,0.22)",
                            boxShadow: "0 0 30px rgba(0,210,255,0.08), inset 0 0 20px rgba(0,210,255,0.04)",
                        }}
                        whileHover={reducedMotion ? {} : { rotateY: 180, transition: { duration: 0.55 } }}
                    >
                        <span className="text-base font-black text-aero-blue">{item.year}</span>
                        {/* Pulse ring — skip if reducedMotion */}
                        {!reducedMotion && (
                            <motion.div
                                className="absolute inset-0 rounded-full border border-aero-blue/20"
                                animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                                transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.3 }}
                            />
                        )}
                    </motion.div>

                    {/* Connector line */}
                    {!isLast && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 sm:h-16 bg-gradient-to-b from-aero-blue/25 to-transparent" aria-hidden="true" />
                    )}
                </div>

                {/* Content card */}
                <motion.div
                    whileHover={reducedMotion ? {} : { x: 6, transition: { duration: 0.2 } }}
                    className="flex-1 group rounded-2xl p-5 sm:p-7 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                        border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    aria-labelledby={`timeline-title-${idx}`}
                >
                    <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.2)" }}
                        aria-hidden="true"
                    />
                    <h3 id={`timeline-title-${idx}`} className="text-lg sm:text-xl font-bold text-white mb-2">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                        {item.desc}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};