import { Router } from "express";
import mongoose from "mongoose";
import taskServices from "#@/modules/task/services/index.js";
import { STATUS_CODES } from "#@/_shared/enums/httpStatusCodes.js";
import { auth } from "#@/middlewares/auth.js";

const router = Router({ mergeParams: true });

function checkUserOwnership(req, res, next) {
  const { userId } = req.params;
  if (req.user.role === "admin" || req.user.id === userId) {
    return next();
  }
  return res.status(STATUS_CODES.FORBIDDEN).json({ success: false, message: "Forbidden" });
}

// GET /users/:userId/projects/:projectId/tasks - Get all tasks
router.get("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const query = { page: parseInt(page), limit: parseInt(limit) };
    const filter = { projectId: new mongoose.Types.ObjectId(projectId) };

    const data = await taskServices.fetchAll({ query, filter });

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// POST /users/:userId/projects/:projectId/tasks - Create new task
router.post("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const { name, status = "pending" } = req.body;

    const payload = { projectId, name, status };

    const data = await taskServices.createOne({ payload });

    res.status(STATUS_CODES.CREATED).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;