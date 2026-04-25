import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface Advantage {
    icon: LucideIcon;
    title: string;
    desc: string;
}

interface RadarCardProps {
    adv: Advantage;
    idx: number;
    reducedMotion?: boolean;
}

export const RadarCard = ({ adv, idx, reducedMotion = false }: RadarCardProps) => {
    const Icon = adv.icon;
    return (
        <motion.article
            initial={reducedMotion ? false : { y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "50px 0px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={reducedMotion ? {} : { y: -5, transition: { duration: 0.22 } }}
            className="group relative rounded-2xl p-7 sm:p-8 overflow-hidden focus-within:ring-2 focus-within:ring-aero-blue/40"
            style={{
                background: "linear-gradient(160deg, #202030 0%, #1c1c2a 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
            aria-label={adv.title}
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.22), 0 14px 36px -12px rgba(0,210,255,0.12)" }}
                aria-hidden="true"
            />

            {/* Icon with pulse rings */}
            <div className="relative w-14 h-14 mb-5" aria-hidden="true">
                {!reducedMotion && [0, 0.6, 1.2].map((delay, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-aero-blue/18"
                        animate={{ scale: [1, 2.2], opacity: [0.35, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay }}
                    />
                ))}
                <div
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center z-10"
                    style={{
                        background: "rgba(0,210,255,0.08)",
                        border: "1px solid rgba(0,210,255,0.22)",
                        boxShadow: "0 0 18px rgba(0,210,255,0.08)",
                    }}
                >
                    <Icon className="w-6 h-6 text-aero-blue" />
                </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2.5">{adv.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{adv.desc}</p>
        </motion.article>
    );
};