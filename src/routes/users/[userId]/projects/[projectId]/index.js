import { Router } from "express";

import routes from "#@/routes/users/[userId]/projects/[projectId]/routes.js";
import tasksRoutes from "#@/routes/users/[userId]/projects/[projectId]/tasks/index.js";

const router = Router({ mergeParams: true });

router.use("/", routes);

router.use("/tasks", tasksRoutes);

export default router;
