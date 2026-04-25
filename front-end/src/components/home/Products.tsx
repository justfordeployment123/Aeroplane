import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

// Non-translatable config: images, colors — stays in TS
const productConfig = [
    { img: "/images/products/double-1000.png", color: "#00d2ff" },
    { img: "/images/products/double-100.png", color: "#4d8eff" },
    { img: "/images/products/double-10.png", color: "#7b61ff" },
    { img: "/images/products/ground-control.png", color: "#06b6d4" },
    { img: "/images/products/control-system.png", color: "#10b981" },
];

interface ProductItem {
    title: string;
    subtitle: string;
    desc: string;
    range: string;
    payload: string;
}

const ProductCard3D = ({ product, config, idx }: { product: ProductItem; config: (typeof productConfig)[number]; idx: number }) => {
    const { t } = useTranslation("home");
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

    return (
        <motion.div
            initial={{ y: 60 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            style={{ perspective: "1200px" }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouse}
                onMouseLeave={() => {
                    mouseX.set(0);
                    mouseY.set(0);
                }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative"
            >
                <Link to="/products" className="block">
                    <div className="relative rounded-2xl overflow-hidden bg-[#161622] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500">
                        <div
                            className="absolute top-0 inset-x-0 h-[1px]"
                            style={{ background: `linear-gradient(90deg, transparent, ${config.color}33, transparent)` }}
                        />

                        <div className="relative h-64 overflow-hidden bg-linear-to-b from-white/[0.02] to-transparent flex items-center justify-center">
                            <div
                                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[50%] rounded-full blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                                style={{ background: config.color }}
                            />
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[50px] opacity-15"
                                style={{ background: config.color }}
                            />
                            <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-[#161622] to-transparent z-10" />
                            <motion.img
                                src={config.img}
                                alt={product.title}
                                className="w-[75%] h-[70%] object-contain relative z-[5]"
                                style={{
                                    transform: "translateZ(40px)",
                                    transformStyle: "preserve-3d",
                                    filter: `drop-shadow(0 0 20px ${config.color}88) brightness(1.4) contrast(1.1)`,
                                }}
                                whileHover={{ scale: 1.08, y: -8 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            />
                        </div>

                        <div className="p-7 pt-4 relative">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color: config.color }}>
                                    {product.subtitle}
                                </span>
                                <span className="text-white/[0.06] text-5xl font-black leading-none absolute -top-8 right-4">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.desc}</p>

                            <div className="flex items-center gap-4 mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                                <div className="flex-1 text-center border-r border-white/[0.06]">
                                    <div className="text-white font-bold text-lg">{product.range}</div>
                                    <div className="text-gray-600 text-[10px] uppercase tracking-wider">{t("products.specs.range")}</div>
                                </div>
                                <div className="flex-1 text-center">
                                    <div className="text-white font-bold text-lg">{product.payload}</div>
                                    <div className="text-gray-600 text-[10px] uppercase tracking-wider">{t("products.specs.payload")}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                                    {t("products.viewDetails")}
                                </span>
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-white/[0.08] group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] transition-all duration-500"
                                    style={{ background: `linear-gradient(135deg, transparent, ${config.color}15)` }}
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
    const { t } = useTranslation("home");
    const products = t("products.items", { returnObjects: true }) as ProductItem[];

    return (
        <section className="py-32 relative overflow-hidden bg-[#111119]">
            <div className="absolute inset-0">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-aero-blue/[0.02] rounded-full blur-[200px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-aero-purple/[0.02] rounded-full blur-[200px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
                    <motion.div initial={{ y: 30 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }}>
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">{t("products.tag")}</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">{t("products.title")}</h2>
                    </motion.div>
                    <motion.div viewport={{ once: true, margin: "200px 0px" }} transition={{ delay: 0.2 }}>
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all text-sm font-medium group"
                            >
                                {t("products.viewAll")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, idx) => (
                        <ProductCard3D key={idx} product={product} config={productConfig[idx]} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};
