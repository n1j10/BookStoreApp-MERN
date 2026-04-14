const jwt = require("jsonwebtoken")

const auth = (requiredRole = null) => {
    return async (req, res, next) => {
        let token = req.headers["authorization"]
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        token = token.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid token.' });
            } else {
                console.log('🔍 Auth middleware decoded:', decoded)
                req.user = decoded
                if (requiredRole && decoded.role !== requiredRole) {
                    console.log(`❌ Access denied. Required: ${requiredRole}, User has: ${decoded.role}`)
                    return res.status(403).json({ 
                        message: 'Access denied. Insufficient permissions.' 
                    });
                }
                next();
            }
        })
    }
}

const cookieAuth = (requiredRole = null) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token

            if (!token) {
                console.log('❌ No token in cookies')
                return res.status(401).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log('🔍 Cookie auth decoded:', decoded)
            
            req.user = decoded;

            // Check role if required
            if (requiredRole && decoded.role !== requiredRole) {
                console.log(`❌ Access denied. Required: ${requiredRole}, User has: ${decoded.role}`)
                return res.status(403).json({ 
                    message: 'Access denied. Insufficient permissions.' 
                });
            }

            next()
        } catch (error) {
            console.log('❌ Cookie auth error:', error.message)
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}

module.exports = { auth, cookieAuth };