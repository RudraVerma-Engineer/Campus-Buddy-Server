import { createUser } from "../Services/user.Service.js";
import {User} from "../model/user.model.js";
import { AppError } from "../utils/AppError.js";

export async function userSignUp(req, res) {
  console.log("reached till userSignUp Controller");
  try {
    const { fullname, email, username, password } = req.body;
    const isUserAlreadyExist = await User.findOne({
      email
    });
    if (isUserAlreadyExist) throw new AppError(400,"User Already Exist");
    const hashedPassword = await User.hashPassword(password);
    if(!hashedPassword) throw new AppError(500,"Unable to hash password! try later after some time");
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      username: username,
      email: email,
      password: hashedPassword,
    });
    if(!user) throw new AppError(400,"Bad Request Need Assistance in creating student");
    const token = user.generateAuthToken();
    return res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    console.error("SignUp error", err);
    res.status(400).json({
      success: false,
      error: err.message,
      message: "Server error",
    });
  }
}
