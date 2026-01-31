module.exports = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.headers["x-user-role"];

    if (!userRole) {
      return res.status(403).json({
        message: "x-user-role header is required"
      });
    }

    if (userRole !== requiredRole) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};
