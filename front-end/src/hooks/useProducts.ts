import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { productCategories, productConfigs, allProductIds, type CategoryConfig } from "../data/product";

// ─── Translated shape (what components consume) ───────────────────────────────

export interface TranslatedSpec {
    label: string;
    value: string;
}

export interface TranslatedProduct {
    // from config (non-text)
    id: string;
    img: string;
    accent: string;
    categoryId: string;
    categoryAccent: string;
    categoryTitle: string;
    paramImg: string | null;
    video: string | null;
    // from translations
    name: string;
    tag: string;
    description: string;
    highlights: string[];
    specs: TranslatedSpec[];
    applications: string[];
}

export interface TranslatedCategory {
    id: string;
    icon: CategoryConfig["icon"];
    accent: string;
    title: string;
    subtitle: string;
    description: string;
    products: TranslatedProduct[];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useProducts = () => {
    const { t } = useTranslation("products");

    const translatedProducts = useMemo<Record<string, TranslatedProduct>>(() => {
        const result: Record<string, TranslatedProduct> = {};

        for (const id of allProductIds) {
            const config = productConfigs[id];
            if (!config) continue;

            const category = productCategories.find((c) => c.id === config.categoryId)!;

            result[id] = {
                // non-text config
                id,
                img: config.img,
                accent: config.accent,
                categoryId: config.categoryId,
                categoryAccent: category.accent,
                paramImg: config.paramImg,
                video: config.video,
                // translated text
                name: t(`products.${id}.name`),
                tag: t(`products.${id}.tag`),
                description: t(`products.${id}.description`),
                highlights: t(`products.${id}.highlights`, { returnObjects: true }) as string[],
                specs: t(`products.${id}.specs`, { returnObjects: true }) as TranslatedSpec[],
                applications: t(`products.${id}.applications`, { returnObjects: true }) as string[],
                categoryTitle: t(`categories.${config.categoryId}.title`),
                // categoryAccent: category.accent,
            };
        }

        return result;
    }, [t]);

    const translatedCategories = useMemo<TranslatedCategory[]>(() => {
        return productCategories.map((cat) => ({
            id: cat.id,
            icon: cat.icon,
            accent: cat.accent,
            title: t(`categories.${cat.id}.title`),
            subtitle: t(`categories.${cat.id}.subtitle`),
            description: t(`categories.${cat.id}.description`),
            products: cat.productIds.map((id) => translatedProducts[id]).filter(Boolean),
        }));
    }, [t, translatedProducts]);

    const allProducts = useMemo(() => Object.values(translatedProducts), [translatedProducts]);

    const getProduct = (id: string): TranslatedProduct | undefined => translatedProducts[id];

    return { translatedCategories, allProducts, getProduct, t };
};
