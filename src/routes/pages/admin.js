import { Router } from "express";
import authPages from "#@/middlewares/auth-pages.js";

const router = Router();

// User management (admin only)
router.get("/users", authPages, (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .render("error", {
        title: "Access Denied",
        message: "Admin access required",
      });
  }
  const isAdmin = true; // Since we checked
  const userJson = JSON.stringify(req.user);
  res.render("users", {
    title: "User Management",
    user: req.user,
    isAdmin,
    userJson,
  });
});

// All projects view (admin only)
router.get("/projects", authPages, (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .render("error", {
        title: "Access Denied",
        message: "Admin access required",
      });
  }
  const isAdmin = true;
  const userJson = JSON.stringify(req.user);
  res.render("admin-projects", {
    title: "All Projects",
    user: req.user,
    isAdmin,
    userJson,
  });
});

// All tasks view (admin only)
router.get("/tasks", authPages, (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .render("error", {
        title: "Access Denied",
        message: "Admin access required",
      });
  }
  const isAdmin = true;
  const userJson = JSON.stringify(req.user);
  res.render("admin-tasks", {
    title: "All Tasks",
    user: req.user,
    isAdmin,
    userJson,
  });
});

export default router;
