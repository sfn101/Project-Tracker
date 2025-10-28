import jwt from "jsonwebtoken";
import { STATUS_CODES } from "#@/_shared/enums/httpStatusCodes.js";
import User from "#@/modules/auth/model/index.js";

export async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user data from database
    const user = await User.findById(decoded.id);

    if (!user || user.status !== "active") {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: "User not found or inactive",
      });
    }

    // Set req.user with fresh database data
    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      status: user.status,
      name: user.name,
    };

    next();
  } catch (error) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token",
    });
  }
}
