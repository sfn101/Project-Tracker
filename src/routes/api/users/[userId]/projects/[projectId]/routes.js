import { Router } from "express";
import projectServices from "#@/modules/project/services/index.js";
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

function checkProjectOwnership(req, res, next) {
  const { userId } = req.params;
  if (!req.project) return next();
  if (req.project.userId.toString() === userId) {
    return next();
  }
  return res.status(STATUS_CODES.FORBIDDEN).json({ success: false, message: "Forbidden" });
}

// GET /users/:userId/projects/:projectId - Get project by ID
router.get("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { projectId, userId } = req.params;

    const data = await projectServices.fetchById({ id: projectId });

    if (!data) {
      throw new Error("Project not found");
    }

    if (data.userId.toString() !== userId) {
      return res.status(STATUS_CODES.FORBIDDEN).json({ success: false, message: "Forbidden" });
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:userId/projects/:projectId - Delete project
router.delete("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { projectId, userId } = req.params;

    const project = await projectServices.fetchById({ id: projectId });
    if (!project || project.userId.toString() !== userId) {
      return res.status(STATUS_CODES.FORBIDDEN).json({ success: false, message: "Forbidden" });
    }

    const data = await projectServices.deleteById({ id: projectId });

    if (!data) {
      throw new Error("Project not found");
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// PUT /users/:userId/projects/:projectId - Update project
router.put("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { projectId, userId } = req.params;

    const project = await projectServices.fetchById({ id: projectId });
    if (!project || project.userId.toString() !== userId) {
      return res.status(STATUS_CODES.FORBIDDEN).json({ success: false, message: "Forbidden" });
    }

    const data = await projectServices.updateById({
      id: projectId,
      payload: req.body,
    });

    if (!data) {
      throw new Error("Project not found");
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;
