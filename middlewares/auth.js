import { verifyAccessToken } from "../config/jwt.js";

const publicRoutes = ["/auth/login", "/auth/register"];

export const authMiddleware = (req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const [type, token] = req.headers.authorization?.split(" ") || [];//" "  pass "Bearer   my-secret-token" // 3 spaces //[] means if the authorization header is not present, it will default to an empty array to avoid errors when destructuring.
  if (!token || type !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = verifyAccessToken(token);
  next();
};