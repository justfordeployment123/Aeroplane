import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers, Cuboid, Clock, BadgeCheck } from "lucide-react";
import { useRef, useEffect, useState, type ReactNode } from "react";

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

const advantages = [
    {
        title: "Systematic Solution",
        desc: "End-to-end integrated platform covering hardware, software, and ops",
        icon: <Layers className="w-7 h-7" />,
        number: 100,
        suffix: "%",
        gradient: "from-cyan-500 to-blue-500",
    },
    {
        title: "Complete Fleet",
        desc: "Full product lineup covering trunk, branch, and terminal operations",
        icon: <Cuboid className="w-7 h-7" />,
        number: 11,
        suffix: "+",
        gradient: "from-blue-500 to-indigo-500",
    },
    {
        title: "Flight Hours",
        desc: "Industry-leading accumulated flight hours with proven reliability",
        icon: <Clock className="w-7 h-7" />,
        number: 100000,
        suffix: "",
        gradient: "from-indigo-500 to-purple-500",
    },
    {
        title: "Certified",
        desc: "Full type certification and international airworthiness compliance",
        icon: <BadgeCheck className="w-7 h-7" />,
        number: 9,
        suffix: "+",
        gradient: "from-purple-500 to-pink-500",
    },
];

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
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.7 }}
            style={{ perspective: "800px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={() => { x.set(0); y.set(0); }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export const CoreAdvantages = () => {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-32 relative overflow-hidden bg-[#060608]">
            {/* Background depth */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.015]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.02]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-aero-blue/[0.03] rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-aero-blue/70 text-[11px] uppercase tracking-[0.2em] mb-4 block font-semibold">Why Choose Us</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white">
                        Core Advantages
                    </h2>
                </motion.div>

                {/* 3D Tilt cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {advantages.map((adv, idx) => (
                        <TiltCard key={idx} idx={idx}>
                            <AdvCard adv={adv} idx={idx} inView={inView} />
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AdvCard = ({
    adv,
    idx,
    inView,
}: {
    adv: (typeof advantages)[number];
    idx: number;
    inView: boolean;
}) => {
    const count = useCounter(adv.number, 2000, inView);
    const display = adv.number >= 10000 ? `${Math.floor(count / 1000)}K` : String(count);

    return (
        <div className="group relative h-full rounded-2xl overflow-hidden bg-[#0a0a12] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
            {/* Top gradient line */}
            <div className={`absolute top-0 inset-x-0 h-[2px] bg-linear-to-r ${adv.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Card inner glow on hover */}
            <div className={`absolute top-0 inset-x-0 h-32 bg-linear-to-b ${adv.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

            <div className="relative p-7" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                {/* Icon with 3D float */}
                <div
                    className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 mb-8 group-hover:shadow-lg transition-all duration-500"
                    style={{ transform: "translateZ(30px)" }}
                >
                    {adv.icon}
                </div>

                {/* Counter */}
                <div className="mb-5" style={{ transform: "translateZ(25px)" }}>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-5xl font-black text-white tabular-nums tracking-tighter">{display}</span>
                        <span className="text-2xl font-bold text-gray-400">{adv.suffix}</span>
                    </div>
                </div>

                {/* Title + desc */}
                <h4 className="text-base font-bold text-white mb-2" style={{ transform: "translateZ(15px)" }}>
                    {adv.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ transform: "translateZ(10px)" }}>
                    {adv.desc}
                </p>

                {/* Bottom number watermark */}
                <div className="absolute bottom-4 right-5 text-[80px] font-black text-white/[0.02] leading-none pointer-events-none">
                    {String(idx + 1).padStart(2, "0")}
                </div>
            </div>
        </div>
    );
};
