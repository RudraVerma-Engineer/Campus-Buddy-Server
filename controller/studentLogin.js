import { User } from "../model/user.model.js";
import { AppError } from "../utils/AppError.js";

export async function studentLogin(req, res, next) {
  try {
    const body = req.body;
    const { username, email, password } = body;
    const user = await User.findOne({
      email: email,
      username:username
    });
    if (!user) throw new AppError(400, "Invalid user! Not have an account");
    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) throw new AppError(401, "Invalid Password");
    const token = user.generateAuthToken();
    return res.cookie("token", token).json({
      success: true,
      token: token,
      message: "Successfully Logged In",
    });
  } catch (err) {
    next(err);
  }
}
