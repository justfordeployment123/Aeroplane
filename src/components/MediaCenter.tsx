import { motion } from "framer-motion";
import { Tv } from "lucide-react";
import { mediaHighlights } from "../data/news";

export const MediaCenter = () => {
    return (
        <section className="py-24 relative overflow-hidden" style={{ background: "#121218" }}>
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-aero-purple/[0.04] rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-aero-purple/70 text-[11px] uppercase tracking-[0.2em] mb-4 block font-semibold">Press Coverage</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Media Center</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                    {mediaHighlights.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="group rounded-2xl overflow-hidden border border-white/[0.06] hover:border-aero-purple/20 transition-all duration-500 cursor-default"
                            style={{ background: "#181820" }}
                        >
                            <div className="relative h-36 overflow-hidden">
                                <motion.img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#181820] via-transparent to-transparent" />
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Tv size={10} className="text-aero-purple" />
                                    <span className="text-[10px] font-bold tracking-wider uppercase text-aero-purple">{item.source}</span>
                                </div>
                                <h4 className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors leading-snug line-clamp-2">
                                    {item.title}
                                </h4>
                                <span className="text-[10px] text-gray-600 mt-2 block">{item.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
