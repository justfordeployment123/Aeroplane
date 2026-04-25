import { motion } from "framer-motion";
import { HoloCard } from "./HoloCard";

interface Product {
    id: string;
    [key: string]: any;
}

interface Category {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    accent: string;
    icon: React.ElementType;
    products: Product[];
}

interface ProductsCatalogProps {
    categories: Category[];
    onProductSelect: (id: string) => void;
    reducedMotion?: boolean;
}

const gridClass = (count: number) => {
    if (count === 1) return "grid-cols-1 max-w-sm";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-2xl";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
};

export const ProductsCatalog = ({ categories, onProductSelect, reducedMotion = false }: ProductsCatalogProps) => {
    return (
        <section className="py-20 sm:py-24 relative overflow-hidden" aria-label="Product catalog">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 sm:space-y-24">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <div key={category.id} id={category.id} className="scroll-mt-36">
                            {/* Category header */}
                            <motion.div
                                initial={reducedMotion ? false : { y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "50px 0px" }}
                                transition={{ duration: 0.55 }}
                                className="mb-10 sm:mb-14"
                            >
                                <div className="flex items-center gap-4 sm:gap-5 mb-4">
                                    <div
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${category.accent}20, ${category.accent}05)`,
                                            border: `1px solid ${category.accent}22`,
                                            boxShadow: `0 0 24px ${category.accent}12`,
                                        }}
                                        aria-hidden="true"
                                    >
                                        <Icon size={22} style={{ color: category.accent }} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: category.accent }}>
                                            {category.subtitle}
                                        </p>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">{category.title}</h2>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm max-w-xl mt-3 ml-0 sm:ml-[76px]">{category.description}</p>
                            </motion.div>

                            {/* Product grid */}
                            <div className={`grid gap-5 sm:gap-6 ${gridClass(category.products.length)}`}>
                                {category.products.map((product, pIdx) => (
                                    <HoloCard
                                        key={product.id}
                                        product={product}
                                        accent={category.accent}
                                        idx={pIdx}
                                        onClick={() => onProductSelect(product.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
