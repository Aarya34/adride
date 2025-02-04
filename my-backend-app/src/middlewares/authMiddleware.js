export const isAuthenticated = (req, res, next) => {
  console.log("Session Data:", req.session);
  if (!req.session.user) {
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }
  req.user = req.session.user;
  next();
};

export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: `Access denied. Required roles: ${roles.join(', ')}` });
    }
    next();
  };
};

export const isAutowala = (req, res, next) => {
  if (!req.user || req.user.role !== 'Autowala') {
    return res.status(403).json({ success: false, error: 'Access denied. Required role: Autowala' });
  }
  next();
};

export const isHelmetwala = (req, res, next) => {
  if (!req.user || req.user.role !== 'Helmetwala') {
    return res.status(403).json({ success: false, error: 'Access denied. Required role: Helmetwala' });
  }
  next();
};
