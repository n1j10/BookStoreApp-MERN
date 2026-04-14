const jwt = require("jsonwebtoken");

const auth = (requiredRole = null) => {
  return (req, res, next) => {
    let token;

    // 1) جرّبي Authorization header أولاً (Bearer ...)
    const authHeader = req.headers['authorization']; // انتبهي lowercase
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    }
    // 2) وإلا خدي التوكن من الكوكي (موقّعة أو عادية)
    else if (req.signedCookies?.token) {
      token = req.signedCookies.token;
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }

      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();
    });
  };
};

module.exports = auth;
