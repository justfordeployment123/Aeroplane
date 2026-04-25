const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
    try {
        let token;

        // Accept token from Authorization header OR httpOnly cookie
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies?.adminToken) {
            token = req.cookies.adminToken;
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id).select("-password");
        if (!admin) {
            return res.status(401).json({ success: false, message: "Admin no longer exists" });
        }

        if (!admin.isActive) {
            return res.status(403).json({ success: false, message: "Account is deactivated" });
        }

        req.admin = admin;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

// Guard: only superadmin
const superAdminOnly = (req, res, next) => {
    if (req.admin?.role !== "superadmin") {
        return res.status(403).json({ success: false, message: "Superadmin access required" });
    }
    next();
};

module.exports = { protect, superAdminOnly };
