import express from "express";
import { Attendance } from "../models/index.js";
import {authenticateToken, authorizeAdmin} from '../middleware/index.js'

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const attendance = await Attendance.findAll();
    res.status(200).json({ attendance });
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { date, status } = req.body;
    const newAttendance = await Attendance.create({ userId, date, status });
    res.status(201).json({
      message: "Attendance recorded successfully",
      newAttendance,
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/update",
  authenticateToken,
  authorizeAdmin,
  async (req, res, next) => {
    try {
      const { id, status } = req.body;
      if (!id || !status) {
        return res.status(400).json({
          message: "ID and status are required",
        });
      }

      const [updated] = await Attendance.update({ status }, { where: { id } });

      if (updated > 0) {
        const updatedAttendance = await Attendance.findOne({
          where: { id },
          attributes: ["userId", "date", "status", "updatedAt"],
        });
        if (updatedAttendance) {
          return res.status(200).json({
            message: "Attendance updated successfully",
            updatedAttendance,
          });
        } else {
          throw new Error("Failed to retrieve updated attendance");
        }
      } else {
        throw new Error("Attendance not found");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete",
  authenticateToken,
  authorizeAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.body;
      const attendance = await Attendance.findOne({ where: { id } });

      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }

      await Attendance.destroy({ where: { id } });
      res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
