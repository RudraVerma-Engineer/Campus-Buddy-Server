import Joi from "joi";
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  semester: {
    type: Number,
    min: 1,
    max: 8,
  },
});

export const Course = mongoose.model("Course", courseSchema);

const courseValidationSchema = Joi.object({
  name: Joi.string().required(),
  branch:Joi.string().required(),
  semester:Joi.number().min(1).max(8).required(),
})