import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routerTimetable from "./routes/timetableRoutes.js";
import userRouter from "./routes/user.router.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/timetables", routerTimetable);
app.use("/users",userRouter);
app("/last",(req,res)=>{
  res.json({
    success:true,
    data:"Rudra verma api working"
  })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
