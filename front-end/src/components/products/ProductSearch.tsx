import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { TranslatedProduct, TranslatedCategory } from "../../hooks/useProducts";

interface ProductSearchProps {
    allProducts: TranslatedProduct[];
    categories: TranslatedCategory[];
    onSelect: (productId: string) => void;
}

export const ProductSearch = ({ allProducts, categories, onSelect }: ProductSearchProps) => {
    const { t } = useTranslation("products");
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Build category lookup for label display
    const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

    // Filter logic — name, tag, description, category title
    const results =
        query.trim().length < 2
            ? []
            : allProducts
                  .filter((p) => {
                      const q = query.toLowerCase();
                      return (
                          p.name.toLowerCase().includes(q) ||
                          p.tag.toLowerCase().includes(q) ||
                          p.description.toLowerCase().includes(q) ||
                        //   p.categoryTitle.toLowerCase().includes(q) ||
                          p.highlights.some((h) => h.toLowerCase().includes(q))
                      );
                  })
                  .slice(0, 8);

    // Open on Cmd/Ctrl+K
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen(true);
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 60);
        else setQuery("");
    }, [open]);

    // Click outside to close
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const handleSelect = useCallback(
        (id: string) => {
            setOpen(false);
            setQuery("");
            onSelect(id);
        },
        [onSelect],
    );

    // Highlight matching text
    const highlight = (text: string, q: string) => {
        if (!q.trim()) return text;
        const idx = text.toLowerCase().indexOf(q.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <mark className="bg-aero-blue/25 text-aero-blue rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
                {text.slice(idx + q.length)}
            </>
        );
    };

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Search products"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/20 text-gray-400 hover:text-white transition-all duration-200 text-sm focus-visible:outline-2 focus-visible:outline-aero-blue/60"
            >
                <Search size={14} aria-hidden="true" />
                <span className="hidden sm:inline">{t("search.placeholder", "Search products...")}</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-white/[0.06] border border-white/10 text-gray-500 font-mono">
                    ⌘K
                </kbd>
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

                        {/* Modal */}
                        <motion.div
                            ref={containerRef}
                            className="relative w-full max-w-xl"
                            initial={{ y: -16, scale: 0.97, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: -10, scale: 0.97, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Product search"
                        >
                            <div
                                className="rounded-2xl overflow-hidden"
                                style={{
                                    background: "#1c1c2a",
                                    border: "1px solid rgba(0,210,255,0.18)",
                                    boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
                                }}
                            >
                                {/* Input row */}
                                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
                                    <Search size={16} className="text-aero-blue shrink-0" aria-hidden="true" />
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder={t("search.placeholder", "Search products...")}
                                        className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm outline-none"
                                        aria-label="Search query"
                                        autoComplete="off"
                                        spellCheck={false}
                                    />
                                    {query && (
                                        <button
                                            onClick={() => setQuery("")}
                                            className="text-gray-600 hover:text-gray-300 transition-colors"
                                            aria-label="Clear search"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="text-gray-600 hover:text-gray-300 transition-colors text-[10px] font-mono border border-white/10 px-1.5 py-0.5 rounded"
                                        aria-label="Close search"
                                    >
                                        ESC
                                    </button>
                                </div>

                                {/* Results */}
                                <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                                    {query.trim().length >= 2 && results.length === 0 && (
                                        <div className="px-4 py-10 text-center text-sm text-gray-600">
                                            {t("search.noResults", "No products found for")} <span className="text-gray-400">"{query}"</span>
                                        </div>
                                    )}

                                    {results.length > 0 && (
                                        <ul role="listbox" aria-label="Search results">
                                            {results.map((product) => {
                                                const cat = categoryMap[product.categoryId];
                                                return (
                                                    <li key={product.id} role="option">
                                                        <button
                                                            onClick={() => handleSelect(product.id)}
                                                            className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-white/[0.04] transition-colors group text-left border-b border-white/[0.04] last:border-0 focus-visible:outline-none focus-visible:bg-white/[0.06]"
                                                        >
                                                            {/* Product image thumbnail */}
                                                            <div
                                                                className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border"
                                                                style={{ borderColor: `${product.accent}25`, background: "#111119" }}
                                                            >
                                                                <img
                                                                    src={product.img}
                                                                    alt={product.name}
                                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                                    loading="lazy"
                                                                />
                                                            </div>

                                                            {/* Text */}
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-white text-sm font-semibold truncate">
                                                                    {highlight(product.name, query)}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-0.5">
                                                                    {cat && (
                                                                        <span
                                                                            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                                                                            style={{ background: `${cat.accent}18`, color: cat.accent }}
                                                                        >
                                                                            {cat.title}
                                                                        </span>
                                                                    )}
                                                                    <span className="text-[11px] text-gray-500 truncate">
                                                                        {highlight(product.tag, query)}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <ArrowRight
                                                                size={14}
                                                                className="text-gray-600 group-hover:text-aero-blue group-hover:translate-x-0.5 transition-all shrink-0"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}

                                    {/* Empty state hint */}
                                    {query.trim().length < 2 && (
                                        <div className="px-4 py-6">
                                            <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-3">
                                                {t("search.allCategories", "Categories")}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {categories.map((cat) => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => setQuery(cat.title)}
                                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
                                                        style={{
                                                            background: `${cat.accent}12`,
                                                            color: cat.accent,
                                                            border: `1px solid ${cat.accent}25`,
                                                        }}
                                                    >
                                                        <Tag size={10} aria-hidden="true" />
                                                        {cat.title}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer hint */}
                                {results.length > 0 && (
                                    <div className="px-4 py-2.5 border-t border-white/[0.05] flex items-center justify-between">
                                        <span className="text-[10px] text-gray-600">
                                            {results.length} {t("search.results", "result(s)")}
                                        </span>
                                        <span className="text-[10px] text-gray-600">↵ {t("search.toOpen", "to open")}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
