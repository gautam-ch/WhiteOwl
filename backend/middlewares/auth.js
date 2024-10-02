// middlewares/auth.js
const authMiddleware = (role) => {
    return (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).send("You need to log in first");
      }
  
      if (req.session.user.role !== role) {
        return res.status(403).send("Access denied");
      }
      
      next();
    };
  };
  
  module.exports = authMiddleware;
  