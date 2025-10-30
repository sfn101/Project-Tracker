import { Router } from "express";
import authPages from "#@/middlewares/auth-pages.js";

const router = Router();

// Projects list
router.get("/", authPages, (req, res) => {
  const isAdmin = req.user.role === "admin";
  const userJson = JSON.stringify(req.user);
  res.render("projects", { title: "Projects", user: req.user, isAdmin, userJson });
});

// Project detail
router.get("/:id", authPages, (req, res) => {
  const projectId = req.params.id;
  const isAdmin = req.user.role === "admin";
  const userJson = JSON.stringify(req.user);
  res.render("project-detail", { title: "Project Details", projectId, user: req.user, isAdmin, userJson });
});

export default router;