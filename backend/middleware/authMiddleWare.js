const jwt = require("jsonwebtoken");
const User = require("../modules/user");

// Middleware to protect private routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Fix: Use decoded.user.id because payload was { user: { id, role } }
      req.user = await User.findById(decoded.user.id).select("-password");

      next();
    } catch (err) {
      console.error("Auth error:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
