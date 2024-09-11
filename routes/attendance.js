import express from "express";
import {
  getAllAttendances,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/index.js";
import { authenticateToken, authorizeAdmin } from "../middlewares/index.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, getAllAttendances);
router.post("/", authenticateToken, createAttendance);
router.put("/update", authenticateToken, authorizeAdmin, updateAttendance);
router.delete("/delete", authenticateToken, authorizeAdmin, deleteAttendance);

export default router;
