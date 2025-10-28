import { STATUS_CODES } from "#@/_shared/enums/httpStatusCodes.js";

export function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(STATUS_CODES.FORBIDDEN).json({ success: false, message: "Forbidden" });
  }
  next();
}

export function isOwnerOrAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  // For members, check if they own the resource
  // This will be used in routes, assuming req.resource.userId or similar
  if (req.resource && req.resource.userId.toString() !== req.user.id) {
    return res.status(STATUS_CODES.FORBIDDEN).json({ success: false, message: "Forbidden" });
  }
  next();
}