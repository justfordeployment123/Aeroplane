import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Filter, ArrowRight } from "lucide-react";
import { newsArticles, type NewsArticle } from "../data/news";

const categories = [
    { key: "all", label: "All News" },
    { key: "update", label: "Updates" },
    { key: "award", label: "Awards" },
    { key: "event", label: "Events" },
    { key: "partnership", label: "Partnerships" },
] as const;

const NewsCard = ({ article, idx }: { article: NewsArticle; idx: number }) => (
    <motion.article
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "200px 0px" }}
        transition={{ delay: idx * 0.05, duration: 0.5 }}
        className="group rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-default"
        style={{ background: "#1c1c2a" }}
    >
        <div className="relative h-48 overflow-hidden">
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
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Calendar size={12} />
                {article.date}
            </div>
            <h3 className="text-[15px] font-bold text-gray-200 group-hover:text-white transition-colors leading-snug mb-2 line-clamp-2">
                {article.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{article.summary}</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-aero-blue opacity-0 group-hover:opacity-100 transition-opacity">
                Read More <ArrowRight size={12} />
            </div>
        </div>
    </motion.article>
);

export const NewsPage = () => {
    const [filter, setFilter] = useState<string>("all");

    const filtered = filter === "all" ? newsArticles : newsArticles.filter((a) => a.category === filter);

    return (
        <div className="min-h-screen" style={{ background: "#161622" }}>
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: "linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }} />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[200px] opacity-[0.06] bg-aero-blue pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
                    <motion.span
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        className="text-xs font-bold tracking-[0.25em] uppercase text-aero-blue mb-4 block"
                    >
                        Latest Updates
                    </motion.span>
                    <motion.h1
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6"
                    >
                        News & Media
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-xl mx-auto text-lg"
                    >
                        Stay informed about our latest achievements, partnerships, and industry developments.
                    </motion.p>
                </div>
            </section>

            {/* Filter + Grid */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Filters */}
                    <motion.div
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 mb-12 flex-wrap"
                    >
                        <Filter size={14} className="text-gray-500" />
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setFilter(cat.key)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                                    filter === cat.key
                                        ? "bg-aero-blue/15 text-aero-blue border-aero-blue/30"
                                        : "text-gray-500 border-white/[0.06] hover:border-white/[0.12] hover:text-gray-300"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((article, idx) => (
                            <NewsCard key={article.id} article={article} idx={idx} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-20 text-gray-500">No articles found in this category.</div>
                    )}
                </div>
            </section>
        </div>
    );
};
