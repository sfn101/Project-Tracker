import { Router } from "express";
import jwt from "jsonwebtoken";
import authPages from "./auth.js";
import dashboardPages from "./dashboard.js";
import projectPages from "./projects.js";
import taskPages from "./tasks.js";
import adminPages from "./admin.js";

const router = Router();

// Home page
router.get("/", (req, res) => {
  console.log("Home route called");
  // Check for token from multiple sources
  const token =
    req.headers.authorization?.replace("Bearer ", "") ||
    req.query.auth_token ||
    req.body?.auth_token;

  let user = null;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, email, role, name } = decoded;
      user = { id, email, role, name };
    } catch (error) {
      // Invalid token, user remains null
    }
  }

  const isAdmin = user?.role === "admin";
  const userJson = user ? JSON.stringify(user) : null;

  res.render("home", { title: "Home", user, isAdmin, userJson });
});

router.use("/", authPages);
router.use("/dashboard", dashboardPages);
router.use("/projects", projectPages);
router.use("/tasks", taskPages);
router.use("/admin", adminPages);

export default router;
