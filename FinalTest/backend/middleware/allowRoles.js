function allowRoles(...roles) {
    return (req, res, next) => {
      const userRole = req.user?.role;
      if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập" });
      }
      next();
    };
  }

  export default allowRoles