import { User } from "../model/user.model.js";

export async function getAllUser(req, res, next) {
  try {
    const authUser = req.authUser;
    const users = await User.find();
    if (!users) throw new Error(400, "not accessed");
    return res.json({
      success: true,
      message: "All users",
      users,
    });
  } catch (err) {
    next(err);
  }
}
