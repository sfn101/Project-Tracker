import jwt from "jsonwebtoken";

const authPages = (req, res, next) => {
  // Get token from multiple sources
  const token =
    req.headers.authorization?.replace("Bearer ", "") ||
    req.query.auth_token ||
    req.body?.auth_token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Only include necessary, safe fields to prevent XSS
    const { id, email, role, name } = decoded;
    req.user = { id, email, role, name };
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

export default authPages;
