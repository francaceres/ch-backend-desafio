export const checkRole = (roles) => (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ status: "error", message: "User not found" });
  }

  if (!roles.includes(user.role)) {
    return res.status(403).json({ status: "error", message: "Forbidden" });
  }

  next();
};
