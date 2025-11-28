import Timetable from "../model/Timetable.js";

// 📘 Get all timetables
export const getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.status(200).json({
      success:true,
      timetables,
      message:"TimeTable Result "
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📗 Get timetable by section and semester
export const getTimetable = async (req, res) => {
  const { section, semester } = req.params;
  try {
    const timetable = await Timetable.findOne({ section, semester });
    if (!timetable) return res.status(404).json({ message: "Timetable not found" });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📙 Create a new timetable
export const createTimetable = async (req, res) => {
  try {
    const newTimetable = new Timetable(req.body);
    const saved = await newTimetable.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📒 Update timetable
export const updateTimetable = async (req, res) => {
  const { section, semester } = req.params;
  try {
    const updated = await Timetable.findOneAndUpdate(
      { section, semester },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Timetable not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🗑️ Delete timetable
export const deleteTimetable = async (req, res) => {
  const { section, semester } = req.params;
  try {
    const deleted = await Timetable.findOneAndDelete({ section, semester });
    if (!deleted) return res.status(404).json({ message: "Timetable not found" });
    res.json({ message: "Timetable deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
