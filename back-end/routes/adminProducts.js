// routes/adminProducts.js
// All routes protected by `protect` middleware (JWT cookie / Bearer token)
//
// GET    /api/admin/products                → list all (visible + hidden)
// GET    /api/admin/products/:id            → single product
// POST   /api/admin/products                → create
// PUT    /api/admin/products/:id            → full update
// DELETE /api/admin/products/:id            → delete + remove Cloudinary images
// PATCH  /api/admin/products/:id/visibility → toggle isVisible
// PATCH  /api/admin/products/:id/order      → update sort order
// POST   /api/admin/products/upload-image   → upload image to Cloudinary → {url, publicId}

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
const { uploadImage, deleteImage } = require("../utils/cloudinary");

// multer: store in memory so we can forward base64 to Cloudinary
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed"));
    },
});

// Apply auth to every admin products route
router.use(protect);

// ── POST /api/admin/products/upload-image ─────────────────────────────────────
// Must be defined BEFORE /:id routes to avoid conflict
router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        const folder = req.body.folder || "markhor/products";

        // Convert buffer → base64 data URI
        const b64 = req.file.buffer.toString("base64");
        const dataUri = `data:${req.file.mimetype};base64,${b64}`;

        const { url, publicId } = await uploadImage(dataUri, folder);

        res.status(201).json({ success: true, url, publicId });
    } catch (err) {
        console.error("Upload image error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── GET /api/admin/products ───────────────────────────────────────────────────
router.get("/", async (req, res) => {
    try {
        const { category, visible } = req.query;
        const filter = {};
        if (category) filter.categoryId = category;
        if (visible !== undefined) filter.isVisible = visible === "true";

        const products = await Product.find(filter).sort({ categoryId: 1, order: 1, createdAt: -1 }).lean();

        res.json({ success: true, count: products.length, products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── GET /api/admin/products/:id ───────────────────────────────────────────────
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── POST /api/admin/products ──────────────────────────────────────────────────
router.post("/", async (req, res) => {
    try {
        const data = sanitizeBody(req.body);

        // Validate required
        const missing = ["name", "tag", "description", "categoryId"].filter((f) => !data[f]);
        if (missing.length) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missing.join(", ")}`,
            });
        }

        const product = await Product.create(data);
        res.status(201).json({ success: true, product });
    } catch (err) {
        handleMongoError(err, res);
    }
});

// ── PUT /api/admin/products/:id ───────────────────────────────────────────────
router.put("/:id", async (req, res) => {
    try {
        const data = sanitizeBody(req.body);

        const existing = await Product.findById(req.params.id);
        if (!existing) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // If the main image is being swapped, delete the old one from Cloudinary
        if (data.img?.publicId && data.img.publicId !== existing.img?.publicId) {
            await deleteImage(existing.img?.publicId);
        }
        // Same for paramImg
        if (data.paramImg?.publicId && data.paramImg.publicId !== existing.paramImg?.publicId) {
            await deleteImage(existing.paramImg?.publicId);
        }

        const updated = await Product.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, runValidators: true });

        res.json({ success: true, product: updated });
    } catch (err) {
        handleMongoError(err, res);
    }
});

// ── DELETE /api/admin/products/:id ────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Clean up Cloudinary assets
        await deleteImage(product.img?.publicId);
        await deleteImage(product.paramImg?.publicId);

        await product.deleteOne();

        res.json({ success: true, message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── PATCH /api/admin/products/:id/visibility ──────────────────────────────────
router.patch("/:id/visibility", async (req, res) => {
    try {
        const { isVisible } = req.body;
        if (typeof isVisible !== "boolean") {
            return res.status(400).json({ success: false, message: "isVisible must be a boolean" });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { isVisible }, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── PATCH /api/admin/products/:id/order ───────────────────────────────────────
router.patch("/:id/order", async (req, res) => {
    try {
        const { order } = req.body;
        if (typeof order !== "number") {
            return res.status(400).json({ success: false, message: "order must be a number" });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { order }, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Strip unknown fields and lightly coerce types from request body */
function sanitizeBody(body) {
    const allowed = [
        "name",
        "tag",
        "description",
        "categoryId",
        "accent",
        "highlights",
        "specs",
        "applications",
        "img",
        "paramImg",
        "video",
        "isVisible",
        "order",
    ];
    const out = {};
    for (const key of allowed) {
        if (key in body) out[key] = body[key];
    }
    // Ensure arrays
    if (out.highlights && !Array.isArray(out.highlights)) out.highlights = [out.highlights];
    if (out.specs && !Array.isArray(out.specs)) out.specs = [out.specs];
    if (out.applications && !Array.isArray(out.applications)) out.applications = [out.applications];
    return out;
}

function handleMongoError(err, res) {
    console.error("Mongo error:", err);
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ success: false, message: messages.join(". ") });
    }
    res.status(500).json({ success: false, message: err.message });
}

module.exports = router;
