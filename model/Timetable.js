import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}-\d{2}:\d{2}$/, "Invalid time format (use HH:MM-HH:MM)"],
  },
  subject_code: { type: String, required: true },
  subject: { type: String, required: true },
  faculty: { type: String, required: true },
  room: { type: String, required: true },
  type: {
    type: String,
    enum: ["Lecture", "Lab", "Tutorial"],
    required: true,
  },
  batch: { type: String, default: null },
});


const daySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
    required: true,
  },
  lectures: [lectureSchema],
});

const timetableSchema = new mongoose.Schema(
  {
    institute: {
      type: String,
      default: "Moradabad Institute of Technology, Moradabad",
    },
    semester: { type: String, required: true },
    session: { type: String, required: true },
    section: { type: String, required: true },
    class_coordinator: { type: String, required: true },
    counselors: [{ type: String }],
    timetable: [daySchema],
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
