const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { protect, superAdminOnly } = require("../middleware/authMiddleware");

// ── Helper: sign JWT ──────────────────────────────────────────────────────────
const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

// ── Helper: send token as cookie + JSON ──────────────────────────────────────
const sendToken = (res, admin, statusCode) => {
    const token = signToken(admin._id);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie("adminToken", token, cookieOptions);

    // Strip sensitive fields before returning
    const adminData = admin.toObject ? admin.toObject() : { ...admin._doc };
    delete adminData.password;
    delete adminData.loginAttempts;
    delete adminData.lockUntil;

    res.status(statusCode).json({
        success: true,
        token,
        admin: adminData,
    });
};

// ────────────────────────────────────────────────────────────────────────────
// POST /api/admin/setup
// One-time route to create the FIRST superadmin.
// Disabled automatically once any admin exists.
// ────────────────────────────────────────────────────────────────────────────
router.post("/setup", async (req, res, next) => {
    try {
        const existingCount = await Admin.countDocuments();
        if (existingCount > 0) {
            return res.status(403).json({
                success: false,
                message: "Setup already complete. An admin already exists.",
            });
        }

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "username, email, and password are required",
            });
        }

        const superadmin = await Admin.create({
            username,
            email,
            password,
            role: "superadmin",
        });

        sendToken(res, superadmin, 201);
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `${field} is already taken`,
            });
        }
        console.log("Error in /setup:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/admin/register
// Protected — only an existing superadmin can create new admins
// ────────────────────────────────────────────────────────────────────────────
router.post("/register", protect, superAdminOnly, async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "username, email, and password are required",
            });
        }

        const admin = await Admin.create({
            username,
            email,
            password,
            role: role === "superadmin" ? "superadmin" : "admin",
        });

        const adminData = admin.toObject();
        delete adminData.password;

        res.status(201).json({ success: true, admin: adminData });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `${field} is already taken`,
            });
        }
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ success: false, message: messages.join(". ") });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/admin/login
// ────────────────────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Include password field (select: false by default)
        const admin = await Admin.findOne({ email }).select("+password +loginAttempts +lockUntil");

        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        if (!admin.isActive) {
            return res.status(403).json({ success: false, message: "Account is deactivated" });
        }

        // Check if account is locked
        if (admin.isLocked()) {
            const minutesLeft = Math.ceil((admin.lockUntil - Date.now()) / 60000);
            return res.status(423).json({
                success: false,
                message: `Account locked. Try again in ${minutesLeft} minute(s).`,
            });
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            await admin.incLoginAttempts();
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Successful login — reset attempts, record last login
        await Admin.findByIdAndUpdate(admin._id, {
            loginAttempts: 0,
            lockUntil: null,
            lastLogin: new Date(),
        });

        sendToken(res, admin, 200);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/admin/me
// Returns current logged-in admin's profile
// ────────────────────────────────────────────────────────────────────────────
router.get("/me", protect, (req, res) => {
    res.json({ success: true, admin: req.admin });
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/admin/logout
// ────────────────────────────────────────────────────────────────────────────
router.post("/logout", protect, (req, res) => {
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({ success: true, message: "Logged out successfully" });
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/admin/list
// Superadmin only — list all admins
// ────────────────────────────────────────────────────────────────────────────
router.get("/list", protect, superAdminOnly, async (req, res) => {
    try {
        const admins = await Admin.find().select("-password -loginAttempts -lockUntil");
        res.json({ success: true, count: admins.length, admins });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ────────────────────────────────────────────────────────────────────────────
// PATCH /api/admin/:id/deactivate
// Superadmin only
// ────────────────────────────────────────────────────────────────────────────
router.patch("/:id/deactivate", protect, superAdminOnly, async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select("-password");

        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }
        res.json({ success: true, admin });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
