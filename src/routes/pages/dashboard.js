import { Router } from "express";
import authPages from "#@/middlewares/auth-pages.js";

const router = Router();

// Dashboard - determine user/admin based on JWT
router.get("/", authPages, (req, res) => {
  const { role } = req.user;
  const isAdmin = role === "admin";
  const userJson = JSON.stringify(req.user);

  if (isAdmin) {
    res.render("dashboard-admin", {
      title: "Admin Dashboard",
      user: req.user,
      isAdmin,
      userJson
    });
  } else {
    res.render("dashboard-user", {
      title: "Dashboard",
      user: req.user,
      isAdmin,
      userJson
    });
  }
});

export default router;