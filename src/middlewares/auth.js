import jwt from "jsonwebtoken";
import { STATUS_CODES } from "#@/_shared/enums/httpStatusCodes.js";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "Invalid token" });
  }
}