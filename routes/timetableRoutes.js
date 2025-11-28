import express from "express";
import { createTimetable, deleteTimetable, getAllTimetables, getTimetable, updateTimetable } from "../controller/timetableController.js";


const routerTimetable = express.Router();

routerTimetable.get("/", getAllTimetables);
routerTimetable.get("/:section/:semester", getTimetable);
routerTimetable.post("/", createTimetable);
routerTimetable.put("/:section/:semester", updateTimetable);
routerTimetable.delete("/:section/:semester", deleteTimetable);

export default routerTimetable;
