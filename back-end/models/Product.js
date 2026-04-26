const mongoose = require("mongoose");

const specSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false },
);

const productSchema = new mongoose.Schema(
    {
        // ── Identity ──────────────────────────────────────────────────────────
        name: { type: String, required: true, trim: true },
        tag: { type: String, required: true, trim: true },
        description: { type: String, required: true },

        // ── Category ─────────────────────────────────────────────────────────
        categoryId: {
            type: String,
            required: true,
            enum: ["uav", "special", "ground-station", "control-system"],
        },
        accent: { type: String, default: "#00D2FF" }, // hex accent colour

        // ── Rich content ─────────────────────────────────────────────────────
        highlights: { type: [String], default: [] },
        specs: { type: [specSchema], default: [] },
        applications: { type: [String], default: [] },

        // ── Media (Cloudinary) ───────────────────────────────────────────────
        img: {
            url: { type: String, default: "" },
            publicId: { type: String, default: "" }, // for Cloudinary deletion
        },
        paramImg: {
            url: { type: String, default: "" },
            publicId: { type: String, default: "" },
        },
        video: { type: String, default: "" }, // direct URL / embed

        // ── Admin controls ───────────────────────────────────────────────────
        isVisible: { type: Boolean, default: true },
        order: { type: Number, default: 0 }, // sort order within category
    },
    { timestamps: true },
);

// Index for fast public catalog queries
productSchema.index({ categoryId: 1, isVisible: 1, order: 1 });

module.exports = mongoose.model("Product", productSchema);
