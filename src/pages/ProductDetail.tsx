import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { allProducts } from "../data/product";
import { VideoPlayer } from "../components/products/VideoPlayer";
import { HoloCard } from "../components/products/HoloCard";

export const ProductDetail = ({ productId, onBack, onNavigate }: { productId: string; onBack: () => void; onNavigate?: (id: string) => void }) => {
    const product = allProducts.find((p) => p.id === productId);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [productId]);

    if (!product) return null;
    const accent = product.categoryAccent;

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            {/* Hero */}
            <section className="relative min-h-[72vh] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{ background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${accent}18 0%, transparent 70%)` }}
                    />
                    <div
                        className="absolute inset-0 opacity-[0.015]"
                        style={{
                            backgroundImage: `linear-gradient(${accent}50 1px, transparent 1px), linear-gradient(90deg, ${accent}50 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                            style={{ borderColor: accent, width: `${(i + 1) * 320}px`, height: `${(i + 1) * 320}px`, opacity: 0.03 }}
                            animate={{ scale: [1, 1.04, 1], opacity: [0.03, 0.07, 0.03] }}
                            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
                        />
                    ))}
                </div>
                <div className="absolute top-24 left-8 w-16 h-16 border-t border-l hidden lg:block" style={{ borderColor: `${accent}25` }} />
                <div className="absolute top-24 right-8 w-16 h-16 border-t border-r hidden lg:block" style={{ borderColor: `${accent}25` }} />
                <motion.button
                    onClick={onBack}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-24 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:border-white/30 hover:text-white"
                    style={{
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.5)",
                        background: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <ArrowLeft size={14} /> Back to Products
                </motion.button>
                {/* <div
                    className="absolute top-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex items-center gap-2 text-[11px] font-mono"
                    style={{ color: `${accent}50` }}
                >
                    <span>Series Products</span>
                    <ChevronRight size={10} />
                    <span>{product.categoryTitle}</span>
                    <ChevronRight size={10} />
                    <span style={{ color: accent }}>{product.name}</span>
                </div> */}
                <div className="absolute top-28 right-12 text-[10px] font-mono text-right space-y-1 hidden lg:block" style={{ color: `${accent}40` }}>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                        SYS.ACTIVE
                    </motion.div>
                    <div>ID: {product.id.toUpperCase()}</div>
                </div>
                <motion.div
                    className="absolute left-0 right-0 h-[1px] z-[2]"
                    style={{
                        background: `linear-gradient(90deg, transparent 5%, ${accent}30 30%, ${accent}55 50%, ${accent}30 70%, transparent 95%)`,
                    }}
                    animate={{ top: ["15%", "85%", "15%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-14 items-end">
                    <motion.div initial={{ x: -30 }} animate={{ x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <motion.span
                            initial={{ y: 10 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
                            style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}25` }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                            {product.tag}
                        </motion.span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight text-white mb-6">
                            {product.name.split(" ").slice(0, 1).join(" ")}
                            <br />
                            <span className="text-2xl md:text-3xl font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>
                                {product.name.split(" ").slice(1).join(" ")}
                            </span>
                        </h1>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-lg mb-8">{product.description}</p>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-black"
                            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, boxShadow: `0 0 30px ${accent}35` }}
                        >
                            Request a Quote <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                    <motion.div
                        initial={{ y: 30 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Large soft glow behind drone */}
                        <div
                            className="absolute inset-0 rounded-3xl"
                            style={{ background: `radial-gradient(ellipse at center, ${accent}40 0%, ${accent}15 40%, transparent 70%)` }}
                        />
                        {/* Bottom reflection glow */}
                        <div
                            className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90%] h-[50%] rounded-full blur-[50px]"
                            style={{ background: `${accent}50` }}
                        />
                        {/* Center bright halo */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[60px]"
                            style={{ background: `${accent}30` }}
                        />
                        {/* Subtle light backdrop panel so dark drone has contrast */}
                        <div
                            className="absolute top-[15%] left-[10%] right-[10%] bottom-[15%] rounded-2xl"
                            style={{ background: `radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)` }}
                        />
                        <motion.div
                            className="absolute inset-0 m-12 rounded-full border opacity-[0.15]"
                            style={{ borderColor: accent }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.img
                            src={product.img}
                            alt={product.name}
                            className="relative z-10 max-h-80 max-w-full object-contain"
                            style={{
                                filter: `drop-shadow(0 0 25px ${accent}) drop-shadow(0 0 50px ${accent}99) drop-shadow(0 0 80px ${accent}55) brightness(1.6) contrast(1.15)`,
                            }}
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>
                <div
                    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                    style={{ background: "linear-gradient(to top, #161622, transparent)" }}
                />
            </section>

            {/* Video */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-8">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                            Product Showcase
                        </p>
                        <h2 className="text-3xl font-black text-white">Live Demonstration</h2>
                    </motion.div>
                    <VideoPlayer src={product.video ?? null} accent={accent} />
                </div>
            </section>

            {/* Highlights */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-8">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                            Core Capabilities
                        </p>
                        <h2 className="text-3xl font-black text-white">Key Features</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.highlights.map((h: string, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20 }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true, margin: "200px 0px" }}
                                transition={{ delay: i * 0.055 }}
                                className="flex items-center gap-3 p-4 rounded-xl border"
                                style={{ background: `${accent}06`, borderColor: `${accent}15` }}
                            >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
                                    <CheckCircle2 size={16} style={{ color: accent }} />
                                </div>
                                <span className="text-sm font-semibold text-gray-200">{h}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specs + Applications */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                        <motion.div initial={{ x: -24 }} whileInView={{ x: 0 }} viewport={{ once: true, margin: "200px 0px" }}>
                            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                                Technical Data
                            </p>
                            <h2 className="text-3xl font-black text-white mb-8">Main Performance Parameters</h2>
                            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${accent}15` }}>
                                <div
                                    className="flex px-5 py-3 text-[10px] font-bold tracking-widest uppercase"
                                    style={{ background: `${accent}10`, color: `${accent}80` }}
                                >
                                    <span className="flex-1">Parameter</span>
                                    <span>Value</span>
                                </div>
                                {product.specs.map((spec: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -10 }}
                                        whileInView={{ x: 0 }}
                                        viewport={{ once: true, margin: "200px 0px" }}
                                        transition={{ delay: i * 0.04 }}
                                        className="flex items-center justify-between px-5 py-3.5 border-t transition-colors hover:bg-white/[0.02]"
                                        style={{ borderColor: `${accent}08` }}
                                    >
                                        <span className="text-sm text-gray-400">{spec.label}</span>
                                        <span className="text-sm font-bold text-white font-mono">{spec.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ x: 24 }} whileInView={{ x: 0 }} viewport={{ once: true, margin: "200px 0px" }}>
                            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                                Use Cases
                            </p>
                            <h2 className="text-3xl font-black text-white mb-8">Application Scenarios</h2>
                            <div className="space-y-4">
                                {product.applications.map((app: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ y: 16 }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true, margin: "200px 0px" }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative rounded-2xl p-5 border overflow-hidden cursor-default"
                                        style={{ background: "#1c1c2a", borderColor: `${accent}15` }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }}
                                        />
                                        <div className="relative z-10 flex items-center gap-4">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                                                style={{ background: `${accent}15`, color: accent }}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </div>
                                            <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">{app}</span>
                                            <ArrowRight
                                                size={14}
                                                className="ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                                                style={{ color: accent }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {product.paramImg && (
                <section className="py-10">
                    <div className="max-w-5xl mx-auto px-6">
                        <motion.div
                            initial={{ y: 24 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "200px 0px" }}
                            className="rounded-2xl overflow-hidden border p-4"
                            style={{ borderColor: `${accent}15`, background: "#1c1c2a" }}
                        >
                            <img
                                src={product.paramImg}
                                alt="Performance parameters"
                                loading="lazy"
                                decoding="async"
                                className="w-full object-contain rounded-xl"
                            />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Related */}
            {(() => {
                const related = allProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);
                if (!related.length) return null;
                return (
                    <section className="py-16 border-t border-white/[0.04]">
                        <div className="max-w-7xl mx-auto px-6">
                            <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }} className="mb-8">
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                                    Same Series
                                </p>
                                <h2 className="text-2xl font-black text-white">Related Products</h2>
                            </motion.div>
                            <div className={`grid gap-5 grid-cols-1 sm:grid-cols-2 ${related.length >= 3 ? "lg:grid-cols-3" : ""}`}>
                                {related.map((p: any, i: number) => (
                                    <HoloCard key={p.id} product={p} accent={accent} idx={i} onClick={() => onNavigate?.(p.id)} />
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })()}

            {/* CTA */}
            <section className="py-24 relative overflow-hidden border-t border-white/5">
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "80px 80px",
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[150px] pointer-events-none"
                    style={{ background: `${accent}06` }}
                />
                <motion.div
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "200px 0px" }}
                    className="relative z-10 text-center px-6 max-w-2xl mx-auto"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to deploy <span style={{ color: accent }}>{product.name.split(" ")[0]}</span>?
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Contact our specialists for custom configurations and enterprise solutions tailored to your mission profile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                Request a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                        <motion.button
                            onClick={onBack}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-4 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300"
                        >
                            Browse All Products
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};
