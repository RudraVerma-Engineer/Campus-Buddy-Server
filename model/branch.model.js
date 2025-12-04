import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  nameBranch: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  }
});

export const Branch = mongoose.model("Branch", branchSchema);