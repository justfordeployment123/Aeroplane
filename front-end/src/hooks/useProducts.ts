// hooks/useProducts.ts
// Replaces the static-data version.
// Fetches from /api/user/products and caches the result.

import { useState, useEffect, useCallback } from "react";

// ── Types (same shape the rest of the app consumes) ──────────────────────────

export interface TranslatedSpec {
    label: string;
    value: string;
}

export interface TranslatedProduct {
    id: string;
    name: string;
    tag: string;
    description: string;
    categoryId: string;
    categoryAccent: string;
    accent: string;
    highlights: string[];
    specs: TranslatedSpec[];
    applications: string[];
    img: string;
    paramImg: string | null;
    video: string | null;
    order: number;
}

export interface TranslatedCategory {
    id: string;
    accent: string;
    // icon is no longer returned from the API — map it in CATEGORY_META below
    icon: React.ElementType;
    title: string;
    subtitle: string;
    description: string;
    products: TranslatedProduct[];
}

// ── Category static metadata (icons + display strings) ───────────────────────
// Keep visual/structural info here; content lives in DB.
import { Plane, Rocket, MonitorDot, Cpu } from "lucide-react";

const CATEGORY_META: Record<
    string,
    {
        icon: React.ElementType;
        title: string;
        subtitle: string;
        description: string;
        order: number;
    }
> = {
    uav: {
        icon: Plane,
        title: "UAV",
        subtitle: "Unmanned Aerial Vehicles",
        description: "High-performance fixed-wing and multi-rotor platforms engineered for precision logistics.",
        order: 1,
    },
    special: {
        icon: Rocket,
        title: "Special Aircraft",
        subtitle: "Mission-Critical Platforms",
        description: "Specialized composite-wing aircraft engineered for demanding operational environments.",
        order: 2,
    },
    "ground-station": {
        icon: MonitorDot,
        title: "Ground Control Station",
        subtitle: "Command & Control Hardware",
        description: "The Ground Control Station processes tasks through a control console, data link, or satellite communication.",
        order: 3,
    },
    "control-system": {
        icon: Cpu,
        title: "UAVs Control System",
        subtitle: "Intelligent Flight Software",
        description:
            "The Operation Control System provides real-time data and performs control operations such as airspace application and flight mission execution.",
        order: 4,
    },
};

// ── API base ──────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL ?? "";

// ── Hook ──────────────────────────────────────────────────────────────────────
interface UseProductsReturn {
    translatedCategories: TranslatedCategory[];
    allProducts: TranslatedProduct[];
    getProduct: (id: string) => TranslatedProduct | undefined;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

// Simple module-level cache so re-mounting doesn't re-fetch
let _cache: TranslatedCategory[] | null = null;

export const useProducts = (): UseProductsReturn => {
    const [categories, setCategories] = useState<TranslatedCategory[]>(_cache ?? []);
    const [loading, setLoading] = useState(!_cache);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/user/products`);
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            const data = await res.json();

            // Merge API categories with local icon/text metadata
            const enriched: TranslatedCategory[] = (data.categories ?? []).map(
                (cat: { id: string; accent: string; products: TranslatedProduct[] }) => {
                    const meta = CATEGORY_META[cat.id];
                    return {
                        id: cat.id,
                        accent: cat.accent,
                        icon: meta?.icon ?? Plane,
                        title: meta?.title ?? cat.id,
                        subtitle: meta?.subtitle ?? "",
                        description: meta?.description ?? "",
                        products: cat.products,
                    };
                },
            );

            _cache = enriched;
            setCategories(enriched);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to load products";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!_cache) fetchProducts();
    }, [fetchProducts]);

    const allProducts = categories.flatMap((c) => c.products);

    const getProduct = (id: string) => allProducts.find((p) => p.id === id);

    return {
        translatedCategories: categories,
        allProducts,
        getProduct,
        loading,
        error,
        refetch: () => {
            _cache = null;
            fetchProducts();
        },
    };
};
