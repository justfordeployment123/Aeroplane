import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers, Cuboid, Clock, BadgeCheck } from "lucide-react";
import { useRef, useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

// Non-translatable config: icons, gradients — stays in TS
const advantageConfig = [
    { icon: <Layers className="w-7 h-7" />, gradient: "from-cyan-500 to-blue-500" },
    { icon: <Cuboid className="w-7 h-7" />, gradient: "from-blue-500 to-indigo-500" },
    { icon: <Clock className="w-7 h-7" />, gradient: "from-indigo-500 to-purple-500" },
    { icon: <BadgeCheck className="w-7 h-7" />, gradient: "from-purple-500 to-pink-500" },
];

interface AdvantageItem {
    title: string;
    desc: string;
    number: number;
    suffix: string;
}

const useCounter = (target: number, duration: number, inView: boolean) => {
    const [count, setCount] = useState(0);
    const done = useRef(false);
    useEffect(() => {
        if (!inView || done.current) return;
        done.current = true;
        const start = performance.now();
        const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, target, duration]);
    return count;
};

const TiltCard = ({ children, idx }: { children: ReactNode; idx: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 25 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 25 });

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            initial={{ y: 50, rotateX: 15 }}
            whileInView={{ y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ delay: idx * 0.12, duration: 0.7 }}
            style={{ perspective: "800px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

const AdvCard = ({ adv, config, idx, inView }: { adv: AdvantageItem; config: (typeof advantageConfig)[number]; idx: number; inView: boolean }) => {
    const count = useCounter(adv.number, 2000, inView);
    const display = adv.number >= 10000 ? `${Math.floor(count / 1000)}K` : String(count);

    return (
        <div className="group relative h-full rounded-2xl overflow-hidden bg-[#181826] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
            <div
                className={`absolute top-0 inset-x-0 h-[2px] bg-linear-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <div
                className={`absolute top-0 inset-x-0 h-32 bg-linear-to-b ${config.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
            />

            <div className="relative p-7" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                <div
                    className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 mb-8 group-hover:shadow-lg transition-all duration-500"
                    style={{ transform: "translateZ(30px)" }}
                >
                    {config.icon}
                </div>

                <div className="mb-5" style={{ transform: "translateZ(25px)" }}>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-5xl font-black text-white tabular-nums tracking-tighter">{display}</span>
                        <span className="text-2xl font-bold text-gray-400">{adv.suffix}</span>
                    </div>
                </div>

                <h4 className="text-base font-bold text-white mb-2" style={{ transform: "translateZ(15px)" }}>
                    {adv.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ transform: "translateZ(10px)" }}>
                    {adv.desc}
                </p>

                <div className="absolute bottom-4 right-5 text-[80px] font-black text-white/[0.02] leading-none pointer-events-none">
                    {String(idx + 1).padStart(2, "0")}
                </div>
            </div>
        </div>
    );
};

export const CoreAdvantages = () => {
    const { t } = useTranslation("home");
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    const advantages = t("advantages.items", { returnObjects: true }) as AdvantageItem[];

    return (
        <section ref={sectionRef} className="py-32 relative overflow-hidden bg-[#111119]">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.015]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.02]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-aero-blue/[0.03] rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div initial={{ y: 30 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="text-center mb-20">
                    <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">{t("advantages.tag")}</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white">{t("advantages.title")}</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {advantages.map((adv, idx) => (
                        <TiltCard key={idx} idx={idx}>
                            <AdvCard adv={adv} config={advantageConfig[idx]} idx={idx} inView={inView} />
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};
