import { Router } from "express";

import routes from "./routes.js";
import tasksRoutes from "./tasks/index.js";

const router = Router({ mergeParams: true });

router.use("/", routes);

router.use("/tasks", tasksRoutes);

export default router;
