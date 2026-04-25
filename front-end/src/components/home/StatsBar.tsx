import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useCounter = (target: number, inView: boolean) => {
    const [count, setCount] = useState(0);
    const done = useRef(false);
    useEffect(() => {
        if (!inView || done.current) return;
        done.current = true;
        const start = performance.now();
        const step = (now: number) => {
            const p = Math.min((now - start) / 1800, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, target]);
    return count;
};

interface StatItem {
    prefix: string;
    value: number;
    suffix: string;
    label: string;
}

const StatItemComponent = ({ stat, idx, inView }: { stat: StatItem; idx: number; inView: boolean }) => {
    const count = useCounter(stat.value, inView);

    return (
        <motion.div
            initial={{ y: 30, rotateX: 15 }}
            whileInView={{ y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ delay: idx * 0.12, duration: 0.7 }}
            className="text-center px-6 py-2"
        >
            <div className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums tracking-tight">
                {stat.prefix}
                {count}
                {stat.suffix}
            </div>
            <div className="text-gray-500 text-xs uppercase tracking-[0.15em] font-medium">{stat.label}</div>
        </motion.div>
    );
};

export const StatsBar = () => {
    const { t } = useTranslation("home");
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const stats = t("stats.items", { returnObjects: true }) as StatItem[];

    return (
        <section ref={ref} className="relative py-0 overflow-hidden">
            <div className="relative" style={{ perspective: "1000px" }}>
                <div className="relative bg-[#111119] border-y border-white/[0.04]">
                    <div className="absolute inset-0 bg-linear-to-r from-aero-blue/[0.03] via-transparent to-aero-purple/[0.03]" />
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[1px]"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.4), transparent)" }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative max-w-7xl mx-auto px-6 py-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/[0.06]">
                            {stats.map((stat, idx) => (
                                <StatItemComponent key={idx} stat={stat} idx={idx} inView={inView} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
