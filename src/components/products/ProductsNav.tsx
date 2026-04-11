import { motion } from "framer-motion";
import { ProductSearch } from "./ProductSearch";
import type { TranslatedProduct, TranslatedCategory } from "../../hooks/useProducts";

interface ProductsNavProps {
    categories: TranslatedCategory[];
    activeSection: string;
    onSelect: (id: string) => void;
    allProducts: TranslatedProduct[];
    onProductSelect: (id: string) => void;
}

export const ProductsNav = ({
    categories,
    activeSection,
    onSelect,
    allProducts,
    onProductSelect,
}: ProductsNavProps) => {
    return (
        <div
            className="sticky top-[85px] z-40 border-b"
            style={{
                background: "rgba(22,22,34,0.92)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255,255,255,0.06)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            }}
            role="navigation"
            aria-label="Product categories"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
                {/* Tab list — scrollable */}
                <div className="flex-1 overflow-x-auto scrollbar-none">
                    <ul className="flex min-w-max" role="list">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const active = activeSection === cat.id;
                            return (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => onSelect(cat.id)}
                                        className="relative flex items-center gap-2 px-4 sm:px-5 py-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-aero-blue/60 whitespace-nowrap"
                                        style={{ color: active ? cat.accent : "rgba(255,255,255,0.42)" }}
                                        aria-current={active ? "true" : undefined}
                                    >
                                        <Icon size={14} aria-hidden="true" />
                                        <span>{cat.title}</span>
                                        {active && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                                                style={{ background: cat.accent }}
                                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                                aria-hidden="true"
                                            />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Search trigger — right-aligned */}
                <div className="shrink-0 py-2 border-l border-white/[0.06] pl-3">
                    <ProductSearch
                        allProducts={allProducts}
                        categories={categories}
                        onSelect={onProductSelect}
                    />
                </div>
            </div>
        </div>
    );
};