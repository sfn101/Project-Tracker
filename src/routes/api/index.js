import { Router } from "express";

import authRoutes from "./auth/index.js";
import usersRoutes from "./users/index.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

export default router;
