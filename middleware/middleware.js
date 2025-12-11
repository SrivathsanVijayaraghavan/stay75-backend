const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

module.exports = (req, res, next) => {
  console.log("🔥 Middleware Loaded");

  try {
    let token = req.headers.authorization;

    console.log("🔹 Incoming RAW token:", token);
    console.log("🔑 Current JWT_SECRET being used:", JWT_SECRET);

    if (!token) {
      console.log("❌ No token found in request headers");
      return res.status(401).json({ error: "No token provided" });
    }

    // Accept tokens formatted as: "Bearer <token>"
    if (token.startsWith("Bearer ")) {
      console.log("🔧 Bearer prefix detected, stripping it...");
      token = token.slice(7).trim();
    }

    console.log("🔹 Token AFTER strip:", token);

    if (!token) {
      console.log("❌ Token missing after Bearer strip");
      return res.status(401).json({ error: "Invalid token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token successfully decoded:", decoded);

    if (!decoded || !decoded.id) {
      console.log("❌ Decoded token missing user id");
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.userId = decoded.id;
    console.log("🔐 Authenticated userId:", req.userId);

    next();

  } catch (err) {
    console.log("❌ ERROR during JWT verification:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};
