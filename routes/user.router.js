import express from "express";
import { userSignUp } from "../controller/userSignUp.js";
import { validationMiddlewareFactory } from "../middleware/validationMiddlewareFactory.js";
import { userLoginValidationSchema, userSigninValidationSchema } from "../model/user.model.js";
import { getAllUser } from "../controller/getAllUser.js";
import { studentLogin } from "../controller/studentLogin.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup",validationMiddlewareFactory(userSigninValidationSchema),userSignUp);

userRouter.post("/login",validationMiddlewareFactory(userLoginValidationSchema),studentLogin);

userRouter.get("/getAllUser",authMiddleware, getAllUser);

export default userRouter;



