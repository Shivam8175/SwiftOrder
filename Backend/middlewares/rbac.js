const rabc = (requiredRole) => (req, res, next) => {
  if (req.user?.role !== requiredRole)
    return res.status(403).json({ message: "Forbidden" });
  next();
};
export default rabc;
