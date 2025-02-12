import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("Token from request:", token);

  if (!token) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    console.log("Decoded User:", req.user);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required roles: ${roles.join(", ")}`,
      });
    }

    next();
  };
};

export const isAutowala = (req, res, next) => {
  if (!req.user || !(req.user.role === 'Autowala' || req.user.role === 'HelmetWala')) {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Required role: Autowala or HelmetWala'
    });
  }
  next();
};

export const isHelmetwala = (req, res, next) => {
  if (!req.user || req.user.role !== 'HelmetWala') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Required role: HelmetWala'
    });
  }
  next();
};
