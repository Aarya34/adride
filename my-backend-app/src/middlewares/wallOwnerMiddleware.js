export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
  
    req.user = req.session.user; 
    next();
  };
  
export const isWallOwner = (req, res, next) => {
    if (!req.user || req.user.role !== 'wallOwner') {
      return res.status(403).json({ success: false, error: 'Access denied. Required role: wallOwner' });
    }
    next();
  };