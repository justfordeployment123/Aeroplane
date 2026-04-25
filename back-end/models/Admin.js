const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, "Username must be at least 3 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false, // never returned in queries by default
        },
        role: {
            type: String,
            enum: ["admin", "superadmin"],
            default: "admin",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

// ── Hash password before save ─────────────────────────────────────────────────
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ── Instance method: compare password ────────────────────────────────────────
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// ── Instance method: check if account is locked ──────────────────────────────
adminSchema.methods.isLocked = function () {
    return this.lockUntil && this.lockUntil > Date.now();
};

// ── Instance method: increment login attempts / lock account ─────────────────
adminSchema.methods.incLoginAttempts = async function () {
    const MAX_ATTEMPTS = 5;
    const LOCK_TIME = 30 * 60 * 1000; // 30 minutes

    // Reset if previous lock has expired
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({ loginAttempts: 1, lockUntil: null });
    }

    const updates = { $inc: { loginAttempts: 1 } };

    if (this.loginAttempts + 1 >= MAX_ATTEMPTS && !this.isLocked()) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }

    return this.updateOne(updates);
};

module.exports = mongoose.model("Admin", adminSchema);
