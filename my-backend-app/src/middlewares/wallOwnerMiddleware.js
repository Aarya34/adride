import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

  
export const isWallOwner = (req, res, next) => {
  if (!req.user || req.user.role !== 'wallOwner') {
    return res.status(403).json({ success: false, error: 'Access denied. Required role: wallOwner' });
  }
  next();
};
