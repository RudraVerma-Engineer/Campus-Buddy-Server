import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import { User } from "../model/user.model.js";

export async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) throw new AppError(401, "UnAuthorized! needs to login");
    const jwtToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!jwtToken) throw new AppError(400, "Invalid Token");
    const authUser = await User.findById(jwtToken.id);
    if (!authUser) throw new AppError(400, "Not have an account");
    req.authUser = authUser;
    next();
  } catch (err) {
    next(err);
  }
}
