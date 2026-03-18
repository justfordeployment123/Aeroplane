import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { newsArticles } from "../data/news";

export const NewsSection = () => {
    const featured = newsArticles.slice(0, 6);

    return (
        <section className="py-28 relative overflow-hidden" style={{ background: "#111119" }}>
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: "linear-gradient(rgba(0,210,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.4) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
                    <motion.div initial={{ y: 30 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "200px 0px" }}>
                        <span className="text-aero-blue/70 text-[11px] uppercase tracking-[0.2em] mb-4 block font-semibold">Latest Updates</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">News & Events</h2>
                    </motion.div>
                    <motion.div>
                        <Link to="/news">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all text-sm font-medium group"
                            >
                                View All News
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((article, idx) => (
                        <motion.article
                            key={article.id}
                            initial={{ y: 30 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "200px 0px" }}
                            transition={{ delay: idx * 0.08, duration: 0.5 }}
                            className="group rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-default"
                            style={{ background: "#1c1c2a" }}
                        >
                            <div className="relative h-44 overflow-hidden">
                                <motion.img
                                    src={article.img}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.06 }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c2a] via-transparent to-transparent" />
                                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-aero-blue/15 text-aero-blue border border-aero-blue/20">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <Calendar size={11} />
                                    {article.date}
                                </div>
                                <h3 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors leading-snug line-clamp-2">
                                    {article.title}
                                </h3>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
