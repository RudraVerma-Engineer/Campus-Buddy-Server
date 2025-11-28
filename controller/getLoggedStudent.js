import { User } from "../model/user.model.js";

export async function getLoggedStudent(req, res, next) {
  try {
    const user = req.authUser;
    return res.json({
      success: true,
      user,
      message: "Logged User Details",
    });
  } catch (err) {
    next(err);
  }
}
