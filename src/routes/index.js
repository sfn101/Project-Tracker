import { Router } from "express";

import authRoutes from "#@/routes/auth/index.js";
import usersRoutes from "#@/routes/users/index.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

export default router;
