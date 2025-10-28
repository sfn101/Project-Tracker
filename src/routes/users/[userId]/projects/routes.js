import { Router } from "express";
import mongoose from "mongoose";
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

// GET /users/:userId/projects - Get all projects
router.get("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const query = { page: parseInt(page), limit: parseInt(limit) };
    const filter = { userId: new mongoose.Types.ObjectId(userId) };

    const data = await projectServices.fetchAll({ query, filter });

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// POST /users/:userId/projects - Create new project
router.post("/", auth, checkUserOwnership, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { name, description, status = "pending" } = req.body;

    const payload = { userId, name, description, status };

    const data = await projectServices.createOne({ payload });

    res.status(STATUS_CODES.CREATED).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;
