import express from "express";
import {
  getAllPayrolls,
  createPayroll,
  getPayrollByUser,
} from "../controllers/index.js";
import { authenticateToken, authorizeAdmin } from "../middlewares/index.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, getAllPayrolls);
router.post("/", authenticateToken, authorizeAdmin, createPayroll);
router.get("/show", authenticateToken, getPayrollByUser);

export default router;
