import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcrypt";
import courseEnum from "../storeComponents/courseEnum.js";
import departmentEnum from "../storeComponents/departmentEnum.js";

const Course = courseEnum;
const Departments = departmentEnum;

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        minlength: 3,
        required: [true, "firstname Required"],
      },
      lastname: {
        type: String,
        minlength: 3,
      },
    },
    username: {
      type: String,
      minlength: 5,
      trim: true,
      required: [true, "username reqiured"],
      unique: [true, "username must be unique"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: Number,
      minlength: 10,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    course: {
      type: String,
      enum: Course,
      required: true,
    },
    department: {
      type: String,
      enum: Departments,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["student", "admin", "faculty", "superAdmin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id, role:this.role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export const User = mongoose.model("User", userSchema);

export const userSigninValidationSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).allow("", null),
  }).required(),
  username: Joi.string().min(5).trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .optional(),
  password: Joi.string().min(8).required(),
  // rollNumber:Joi.string().required(),
  // course:Joi.string().valid(...Course).required(),
  // department:Joi.string().valid(...Departments).required(),
  // semester:Joi.number().min(1).max(8).required(),
});

export const userLoginValidationSchema = Joi.object({
  username:Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
