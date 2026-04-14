// auth/middleware.js
const jwt = require("jsonwebtoken");

// كوكي فقط + فحص الدور (اختياري)
function cookieAuth(requiredRole = null) {
  return (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) return res.status(401).json({ message: "No token provided" });

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const role = (decoded.role || "user").toString().trim().toLowerCase();

      req.user = { ...decoded, role };

      if (requiredRole && role !== requiredRole) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = cookieAuth; // تصدير افتراضي
