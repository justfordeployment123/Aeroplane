import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useProducts } from "../hooks/useProducts";
import { ProductDetail } from "./ProductDetail";
import { ProductDetailShell } from "../components/products/ProductDetailShell";
import { ProductsHero } from "../components/products/ProductsHero";
import { ProductsNav } from "../components/products/ProductsNav";
import { ProductsCatalog } from "../components/products/ProductsCatalog";
import { ProductsCTA } from "../components/products/ProductsCTA";

export const ProductsPage = () => {
    const { translatedCategories, allProducts, getProduct } = useProducts();
    const prefersReducedMotion = useReducedMotion() ?? false;

    const [activeSection, setActiveSection] = useState(translatedCategories[0]?.id ?? "uav");
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    useEffect(() => {
        if (selectedProductId) return;
        const observers: IntersectionObserver[] = [];
        translatedCategories.forEach((cat) => {
            const el = document.getElementById(cat.id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) setActiveSection(cat.id); },
                { rootMargin: "-35% 0px -55% 0px" },
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [selectedProductId, translatedCategories]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
    };

    const handleBack = () => {
        setSelectedProductId(null);
        setTimeout(() => window.scrollTo({ top: 0 }), 50);
    };

    // Product detail view
    if (selectedProductId) {
        const product = getProduct(selectedProductId);
        if (!product) { handleBack(); return null; }

        return (
            <ProductDetailShell
                product={product}
                categories={translatedCategories}
                allProducts={allProducts}
                onBack={handleBack}
                onNavigate={(id) => setSelectedProductId(id)}
            >
                <ProductDetail
                    productId={selectedProductId}
                    onBack={handleBack}
                    onNavigate={(id) => setSelectedProductId(id)}
                />
            </ProductDetailShell>
        );
    }

    // Catalog view
    return (
        <main className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            <ProductsHero reducedMotion={prefersReducedMotion} />
            <ProductsNav
                categories={translatedCategories}
                activeSection={activeSection}
                onSelect={scrollTo}
                allProducts={allProducts}
                onProductSelect={setSelectedProductId}
            />
            <ProductsCatalog
                categories={translatedCategories}
                onProductSelect={setSelectedProductId}
                reducedMotion={prefersReducedMotion}
            />
            <ProductsCTA reducedMotion={prefersReducedMotion} />
        </main>
    );
};