export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
    req.user = req.session.user;
    next();
  };
  
  export const isAutowala = (req, res, next) => {
    if (!req.user || req.user.role !== 'Autowala/HelmetWala') {
      return res.status(403).json({ success: false, error: 'Access denied. Required role: Autowala' });
    }
    next();
  };
  
  export const isHelmetwala = (req, res, next) => {
    if (!req.user || req.user.role !== 'Autowala/HelmetWala') {
      return res.status(403).json({ success: false, error: 'Access denied. Required role: Helmetwala' });
    }
    next();
  };
  