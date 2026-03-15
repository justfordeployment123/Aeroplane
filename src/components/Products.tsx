import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const products = [
    {
        title: "Double 1000 Series",
        subtitle: "Trunk Line",
        desc: "Long-range heavy-duty UAV for trunk logistics connecting major hubs across vast distances.",
        img: "https://www.htsdfp.com/UploadFiles/2024-10-10/gbm3aqgufndmem5n.png",
        range: "1,000 km",
        payload: "1,000 kg",
        color: "#00d2ff",
    },
    {
        title: "Double 100 Series",
        subtitle: "Branch Line",
        desc: "Mid-range versatile UAV bridging regional distribution with precision delivery.",
        img: "https://www.htsdfp.com/UploadFiles/2024-10-10/qm2fdjkspstmse7r.png",
        range: "100 km",
        payload: "100 kg",
        color: "#4d8eff",
    },
    {
        title: "Double 10 Series",
        subtitle: "Terminal Line",
        desc: "Compact last-mile delivery UAV enabling door-to-door autonomous operations.",
        img: "https://www.htsdfp.com/UploadFiles/2024-06-18/ceqz12usfnsnru3e.png",
        range: "10 km",
        payload: "10 kg",
        color: "#7b61ff",
    },
    {
        title: "Ground Control Station",
        subtitle: "Command & Control",
        desc: "Ruggedized control terminals from handheld units to vehicle-mounted command shelters.",
        img: "https://www.htsdfp.com/UploadFiles/2024-05-15/eghckgxtpuqmwpms.png",
        range: "Full Range",
        payload: "Multi-UAV",
        color: "#06b6d4",
    },
    {
        title: "Operation Control System",
        subtitle: "Fleet Management",
        desc: "Integrated operation control systems for autonomous fleet management and mission planning.",
        img: "https://www.htsdfp.com/UploadFiles/2024-10-10/fj99u6mptthuhapw.png",
        range: "Unlimited",
        payload: "Software",
        color: "#10b981",
    },
];

const ProductCard3D = ({ product, idx }: { product: (typeof products)[number]; idx: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

    const handleMouse = (e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
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
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            style={{ perspective: "1200px" }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouse}
                onMouseLeave={handleLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative"
            >
                <Link to="/products" className="block">
                    <div className="relative rounded-2xl overflow-hidden bg-[#121218] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500">
                        {/* Reflective top edge */}
                        <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${product.color}33, transparent)` }} />

                        {/* Image area with 3D depth */}
                        <div className="relative h-64 overflow-hidden bg-linear-to-b from-white/[0.02] to-transparent flex items-center justify-center">
                            {/* Radial glow behind product */}
                            <div
                                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[50%] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                                style={{ background: product.color }}
                            />

                            {/* Reflection surface */}
                            <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-[#121218] to-transparent z-10" />

                            <motion.img
                                src={product.img}
                                alt={product.title}
                                className="w-[75%] h-[70%] object-contain relative z-[5] drop-shadow-2xl"
                                style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
                                whileHover={{ scale: 1.08, y: -8 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            />
                        </div>

                        {/* Content */}
                        <div className="p-7 pt-4 relative">
                            {/* Subtitle + Number */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: product.color }}>
                                    {product.subtitle}
                                </span>
                                <span className="text-white/[0.06] text-5xl font-black leading-none absolute -top-8 right-4">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.desc}</p>

                            {/* Specs bar */}
                            <div className="flex items-center gap-4 mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                                <div className="flex-1 text-center border-r border-white/[0.06]">
                                    <div className="text-white font-bold text-lg">{product.range}</div>
                                    <div className="text-gray-600 text-[10px] uppercase tracking-wider">Range</div>
                                </div>
                                <div className="flex-1 text-center">
                                    <div className="text-white font-bold text-lg">{product.payload}</div>
                                    <div className="text-gray-600 text-[10px] uppercase tracking-wider">Payload</div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                                    View Details
                                </span>
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-white/[0.08] group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] transition-all duration-500"
                                    style={{ background: `linear-gradient(135deg, transparent, ${product.color}15)` }}
                                >
                                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export const Products = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-[#0e0e14]">
            {/* Deep background layers */}
            <div className="absolute inset-0">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-aero-blue/[0.02] rounded-full blur-[200px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-aero-purple/[0.02] rounded-full blur-[200px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">Our Fleet</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Series Products
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all text-sm font-medium group"
                            >
                                View All
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* 3D Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, idx) => (
                        <ProductCard3D key={idx} product={product} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};
