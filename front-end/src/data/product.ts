import { Plane, Rocket, MonitorDot, Cpu } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductSpec {
    labelKey: string; // translation key suffix, e.g. "maxTakeoffWeight"
    value: string;    // numeric/unit values stay here — never translated
}

export interface ProductConfig {
    id: string;
    img: string;
    accent: string;
    categoryId: string;
    paramImg: string | null;
    video: string | null;
    highlightCount: number;   // how many highlights exist (for array indexing)
    specCount: number;        // how many specs exist
    applicationCount: number; // how many applications exist
}

export interface CategoryConfig {
    id: string;
    icon: typeof Plane;
    accent: string;
    productIds: string[];
}

// ─── Category Config (non-text) ───────────────────────────────────────────────

export const productCategories: CategoryConfig[] = [
    {
        id: "uav",
        icon: Plane,
        accent: "#00d2ff",
        productIds: ["fp-98", "fp-985", "fp-981c", "fp-981a", "fp-980-7b"],
    },
    {
        id: "special",
        icon: Rocket,
        accent: "#a855f7",
        productIds: ["fp-981cs"],
    },
    {
        id: "ground-station",
        icon: MonitorDot,
        accent: "#06b6d4",
        productIds: ["fp-980-1", "fp-980-2", "fp-980-3b", "fp-980-3c"],
    },
    {
        id: "control-system",
        icon: Cpu,
        accent: "#10b981",
        productIds: ["uav-ocs"],
    },
];

// ─── Product Config (non-text) ────────────────────────────────────────────────

export const productConfigs: Record<string, ProductConfig> = {
    "fp-98": {
        id: "fp-98",
        img: "/images/products/fp-98.png",
        accent: "#00d2ff",
        categoryId: "uav",
        paramImg: "/images/products/fp-98-params.png",
        video: "/videos/1.mp4",
        highlightCount: 4,
        specCount: 8,
        applicationCount: 4,
    },
    "fp-985": {
        id: "fp-985",
        img: "/images/products/fp-985.png",
        accent: "#00d2ff",
        categoryId: "uav",
        paramImg: null,
        video: "/videos/2.mp4",
        highlightCount: 4,
        specCount: 8,
        applicationCount: 3,
    },
    "fp-981c": {
        id: "fp-981c",
        img: "/images/products/fp-981c.png",
        accent: "#00d2ff",
        categoryId: "uav",
        paramImg: null,
        video: "/videos/3.mp4",
        highlightCount: 7,
        specCount: 8,
        applicationCount: 3,
    },
    "fp-981a": {
        id: "fp-981a",
        img: "/images/products/fp-981a.png",
        accent: "#00d2ff",
        categoryId: "uav",
        paramImg: null,
        video: "/videos/4.mp4",
        highlightCount: 4,
        specCount: 8,
        applicationCount: 4,
    },
    "fp-980-7b": {
        id: "fp-980-7b",
        img: "/images/products/fp-980-7b.png",
        accent: "#00d2ff",
        categoryId: "uav",
        paramImg: null,
        video: "/videos/5.mp4",
        highlightCount: 4,
        specCount: 8,
        applicationCount: 3,
    },
    "fp-981cs": {
        id: "fp-981cs",
        img: "/images/products/fp-981cs.png",
        accent: "#a855f7",
        categoryId: "special",
        paramImg: null,
        video: null,
        highlightCount: 4,
        specCount: 8,
        applicationCount: 4,
    },
    "fp-980-1": {
        id: "fp-980-1",
        img: "/images/products/fp-980-1.png",
        accent: "#06b6d4",
        categoryId: "ground-station",
        paramImg: null,
        video: null,
        highlightCount: 4,
        specCount: 8,
        applicationCount: 3,
    },
    "fp-980-2": {
        id: "fp-980-2",
        img: "/images/products/fp-980-2.png",
        accent: "#06b6d4",
        categoryId: "ground-station",
        paramImg: null,
        video: null,
        highlightCount: 4,
        specCount: 8,
        applicationCount: 3,
    },
    "fp-980-3b": {
        id: "fp-980-3b",
        img: "/images/products/fp-980-3b.png",
        accent: "#06b6d4",
        categoryId: "ground-station",
        paramImg: null,
        video: null,
        highlightCount: 4,
        specCount: 8,
        applicationCount: 3,
    },
    "fp-980-3c": {
        id: "fp-980-3c",
        img: "/images/products/fp-980-3c.png",
        accent: "#06b6d4",
        categoryId: "ground-station",
        paramImg: null,
        video: null,
        highlightCount: 4,
        specCount: 8,
        applicationCount: 3,
    },
    "uav-ocs": {
        id: "uav-ocs",
        img: "/images/products/uav-ocs.png",
        accent: "#10b981",
        categoryId: "control-system",
        paramImg: null,
        video: null,
        highlightCount: 4,
        specCount: 8,
        applicationCount: 3,
    },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const allProductIds = productCategories.flatMap((cat) => cat.productIds);

export const getCategoryForProduct = (productId: string): CategoryConfig | undefined =>
    productCategories.find((cat) => cat.productIds.includes(productId));

export const getCategoryAccent = (categoryId: string): string =>
    productCategories.find((c) => c.id === categoryId)?.accent ?? "#00d2ff";