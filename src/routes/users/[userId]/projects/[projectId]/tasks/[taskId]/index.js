import { Router } from "express";

import routes from "#@/routes/users/[userId]/projects/[projectId]/tasks/[taskId]/routes.js";

const router = Router({ mergeParams: true });

router.use("/", routes);

export default router;