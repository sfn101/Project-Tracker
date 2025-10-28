import { Router } from "express";
import userServices from "#@/modules/user/services/index.js";
import { STATUS_CODES } from "#@/_shared/enums/httpStatusCodes.js";
import { auth } from "#@/middlewares/auth.js";

const router = Router({ mergeParams: true });

function checkOwnership(req, res, next) {
  const { userId } = req.params;
  if (req.user.role === "admin" || req.user.id === userId) {
    return next();
  }
  return res.status(403).json({ success: false, message: "Forbidden" });
}

// GET /users/:userId - Get user by ID
router.get("/", auth, checkOwnership, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const data = await userServices.fetchById({ id: userId });

    if (!data) {
      throw new Error("User not found");
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:userId - Delete user
router.delete("/", auth, checkOwnership, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const data = await userServices.deleteById({ id: userId });

    if (!data) {
      throw new Error("User not found");
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// PUT /users/:userId - Update user
router.put("/", auth, checkOwnership, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const data = await userServices.updateById({
      id: userId,
      payload: req.body,
    });

    if (!data) {
      throw new Error("User not found");
    }

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;
