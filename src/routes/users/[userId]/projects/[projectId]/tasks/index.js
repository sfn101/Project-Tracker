import { Router } from "express";
import mongoose from "mongoose";

import routes from "#@/routes/users/[userId]/projects/[projectId]/tasks/routes.js";
import taskIdRoutes from "#@/routes/users/[userId]/projects/[projectId]/tasks/[taskId]/index.js";

const router = Router({ mergeParams: true });

router.use("/", routes);

router.use("/:taskId", validateObjectId, taskIdRoutes);

function validateObjectId(req, _, next) {
  try {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new Error("Invalid task ID");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default router;