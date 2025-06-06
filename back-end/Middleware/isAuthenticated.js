

const isAuthenticated = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  };

module.exports = isAuthenticated;
