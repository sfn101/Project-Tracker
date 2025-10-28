import { Router } from "express";
import mongoose from "mongoose";

import routes from "#@/routes/users/[userId]/projects/routes.js";
import projectIdRoutes from "#@/routes/users/[userId]/projects/[projectId]/index.js";

const router = Router({ mergeParams: true });

router.use("/", routes);

router.use("/:projectId", validateObjectId, projectIdRoutes);

function validateObjectId(req, _, next) {
  try {
    const { projectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("Invalid project ID");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default router;
