import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
    src: string;
    alt: string;
    reducedMotion?: boolean;
}

export const ParallaxImage = ({ src, alt, reducedMotion = false }: ParallaxImageProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Toned-down spring config for better perf
    const springConfig = { stiffness: 120, damping: 30 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], reducedMotion ? [0, 0] : [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-8, 8]), springConfig);
    const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-10, 10]), springConfig);
    const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-10, 10]), springConfig);

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
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ perspective: "1200px" }}
            className="relative group"
            role="img"
            aria-label={alt}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative rounded-3xl overflow-hidden"
            >
                {/* Hover glow */}
                <div
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: "radial-gradient(ellipse at 50% 50%, rgba(0,210,255,0.12) 0%, transparent 60%)",
                        transform: "translateZ(-20px)",
                    }}
                    aria-hidden="true"
                />

                {/* Corner brackets */}
                {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((cls, i) => (
                    <div key={i} className={`absolute w-8 h-8 ${cls} border-aero-blue/40 z-20`} aria-hidden="true" />
                ))}

                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aero-blue/50 to-transparent z-10" aria-hidden="true" />

                <div
                    className="relative border border-white/10"
                    style={{ boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)" }}
                >
                    <motion.img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover rounded-3xl"
                        style={{ x: imgX, y: imgY }}
                    />
                </div>

                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#161622] to-transparent z-10" aria-hidden="true" />
            </motion.div>
        </motion.div>
    );
};