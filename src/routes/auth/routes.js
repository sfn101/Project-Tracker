import { Router } from "express";
import authServices from "#@/modules/auth/services/index.js";
import { STATUS_CODES } from "#@/_shared/enums/httpStatusCodes.js";

const router = Router();

// POST /auth/register - Register new user
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const payload = { name, email, password, role };

    const data = await authServices.signup({ payload });

    res.status(STATUS_CODES.CREATED).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// POST /auth/login - Login user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const payload = { email, password };

    const data = await authServices.login({ payload });

    res.status(STATUS_CODES.OK).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;