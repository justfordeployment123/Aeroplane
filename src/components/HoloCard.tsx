import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export const HoloCard = ({ product, accent, idx, onClick }: { product: any; accent: string; idx: number; onClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 });
    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.6 }}
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
                className="group relative cursor-pointer"
                onClick={onClick}
            >
                <div
                    className="relative rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: "#1c1c2a", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: useTransform(
                                [glareX, glareY],
                                ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
                            ),
                        }}
                    />
                    <motion.div
                        className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative h-56 flex items-center justify-center p-6 overflow-hidden">
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                            style={{ background: accent }}
                        />
                        <div
                            className="absolute bottom-0 inset-x-0 h-1/2 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                            style={{
                                backgroundImage: `linear-gradient(${accent}40 1px, transparent 1px), linear-gradient(90deg, ${accent}40 1px, transparent 1px)`,
                                backgroundSize: "30px 30px",
                                maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                            }}
                        />
                        <motion.img
                            src={product.img}
                            alt={product.name}
                            className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                            style={{ transform: "translateZ(30px)" }}
                            whileHover={{ scale: 1.1, y: -8 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                    </div>
                    <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }} />
                    <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                        <div>
                            <span
                                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full inline-block mb-3"
                                style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}20` }}
                            >
                                {product.tag}
                            </span>
                            <h3 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors leading-snug">{product.name}</h3>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-medium text-gray-500 group-hover:text-white transition-colors">View Specs</span>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/[0.06] group-hover:border-transparent transition-all"
                                style={{ background: `linear-gradient(135deg, transparent, ${accent}15)` }}
                            >
                                <ArrowRight size={13} style={{ color: accent }} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};