import { Router } from "express";
import authPages from "#@/middlewares/auth-pages.js";

const router = Router();

// Tasks list
router.get("/", authPages, (req, res) => {
  const isAdmin = req.user.role === "admin";
  const userJson = JSON.stringify(req.user);
  res.render("tasks", { title: "Tasks", user: req.user, isAdmin, userJson });
});

// Task detail
router.get("/:id", authPages, (req, res) => {
  const taskId = req.params.id;
  const isAdmin = req.user.role === "admin";
  const userJson = JSON.stringify(req.user);
  res.render("task-detail", { title: "Task Details", taskId, user: req.user, isAdmin, userJson });
});

export default router;