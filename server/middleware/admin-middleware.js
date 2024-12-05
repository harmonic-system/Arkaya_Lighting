const adminMiddleware = async (req, res, next) => {
  try {
    const { isAdmin, role } = req.user; // Extracting isAdmin and role from req.user

    // Check if user is an Admin or productAdmin
    if (!isAdmin && role !== "productAdmin") {
      return res.status(403).json({ message: "Access Denied: Insufficient permissions" });
    }

    // Restrict productAdmin to specific routes
    if (role === "productAdmin") {
      const allowedRoutes = [
        "/addsingalProduct",
        "/getsingalProduct/",
        "/updatesingalProduct/",
        "/deletesingalProduct/",
      ];

      // Check if the requested URL matches any allowed route for productAdmin
      const isAllowedRoute = allowedRoutes.some((route) => req.originalUrl.includes(route));
      if (!isAllowedRoute) {
        return res.status(403).json({ message: "Access Denied: Route restricted for productAdmin" });
      }
    }

    // Allow full access to Admin
    next(); // Proceed if user is authorized
  } catch (error) {
    // console.error("Error in adminMiddleware:", error);
    return res.status(403).json({ message: "Access Denied: Middleware error" });
  }
};

module.exports = adminMiddleware;




