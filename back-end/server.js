require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const adminRoutes = require("./routes/adminRoutes");

const userProductsRouter = require("./routes/userProducts");
const adminProductsRouter = require("./routes/adminProducts");

const app = express();

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true, // allow cookies
    }),
);

// ── Body / Cookie parsing ─────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Global rate limiter ───────────────────────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// ── Stricter limiter for auth endpoints ───────────────────────────────────────
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many login attempts, please try again later." },
});
app.use("/api/admin/login", authLimiter);
app.use("/api/admin/setup", authLimiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/admin", adminRoutes);

// Health check

// ── Add to your main server.js / app.js ───────────────────────────────────────
// Install the new dependency first:
//   npm install cloudinary multer

// Public – no auth
app.use("/api/user/products", userProductsRouter);

// Protected – uses protect middleware internally
app.use("/api/admin/products", adminProductsRouter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
});

// ── Database + Server ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });
