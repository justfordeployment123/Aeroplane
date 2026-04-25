// routes/userProducts.js
// Public – no auth required
// GET /api/user/products          → all visible products grouped by category
// GET /api/user/products/:id      → single visible product

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ── Category metadata (static – only visual/structural info) ─────────────────
// This replaces the old front-end productCategories config.
// Accent colours and icons are kept here; all content is in the DB.
const CATEGORY_META = {
    uav: {
        order: 1,
        accent: "#00D2FF",
        defaultAccent: "#00D2FF",
    },
    "uav-accessories": {
        order: 2,
        accent: "#A78BFA",
        defaultAccent: "#A78BFA",
    },
    "counter-uav": {
        order: 3,
        accent: "#F87171",
        defaultAccent: "#F87171",
    },
    "ground-robot": {
        order: 4,
        accent: "#34D399",
        defaultAccent: "#34D399",
    },
    charging: {
        order: 5,
        accent: "#FBBF24",
        defaultAccent: "#FBBF24",
    },
};

// ── GET /api/user/products ────────────────────────────────────────────────────
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({ isVisible: true }).sort({ categoryId: 1, order: 1, createdAt: 1 }).lean();

        // Group by category
        const grouped = {};
        for (const p of products) {
            if (!grouped[p.categoryId]) grouped[p.categoryId] = [];
            grouped[p.categoryId].push(formatProduct(p));
        }

        // Build ordered categories array (only categories that have products)
        const categories = Object.entries(grouped)
            .map(([id, products]) => ({
                id,
                ...(CATEGORY_META[id] ?? { order: 99, accent: "#ffffff" }),
                products,
            }))
            .sort((a, b) => a.order - b.order);

        res.json({ success: true, categories });
    } catch (err) {
        console.error("GET /api/user/products:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── GET /api/user/products/:id ────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            isVisible: true,
        }).lean();

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product: formatProduct(product) });
    } catch (err) {
        console.error("GET /api/user/products/:id:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── Formatter: shape DB doc → front-end shape ────────────────────────────────
function formatProduct(p) {
    return {
        id: p._id.toString(),
        name: p.name,
        tag: p.tag,
        description: p.description,
        categoryId: p.categoryId,
        categoryAccent: CATEGORY_META[p.categoryId]?.accent ?? p.accent,
        accent: p.accent,
        highlights: p.highlights ?? [],
        specs: p.specs ?? [],
        applications: p.applications ?? [],
        img: p.img?.url ?? "",
        paramImg: p.paramImg?.url ?? null,
        video: p.video ?? null,
        order: p.order,
    };
}

module.exports = router;
