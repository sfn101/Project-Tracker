import { Router } from "express";
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

// GET /users/:userId/projects/:projectId/tasks/:taskId - Get task by ID
router.get("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const data = await taskServices.fetchById({ id: taskId });

    if (!data) {
      throw new Error("Task not found");
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:userId/projects/:projectId/tasks/:taskId - Delete task
router.delete("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const data = await taskServices.deleteById({ id: taskId });

    if (!data) {
      throw new Error("Task not found");
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// PUT /users/:userId/projects/:projectId/tasks/:taskId - Update task
router.put("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const data = await taskServices.updateById({
      id: taskId,
      payload: req.body,
    });

    if (!data) {
      throw new Error("Task not found");
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;