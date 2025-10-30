import { Router } from "express";

const router = Router();

// Login page
router.get("/login", (req, res) => {
  const registered = req.query.registered === 'true';
  res.render("login", { title: "Login", registered });
});

// Register page
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

export default router;