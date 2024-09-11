import express from "express";
import { Payroll, User } from "../models/index.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";

const router = express.Router();

// Route untuk mendapatkan data payroll untuk semua pengguna (hanya untuk admin)
router.get("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const payroll = await Payroll.findAll({
      include: { model: User, attributes: ["username"] },
    });
    res.status(200).json({ payroll });
  } catch (error) {
    next(error);
  }
});

// Route untuk menambahkan data payroll baru (hanya untuk admin)
router.post("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const { userId, month, year, salary } = req.body;

    if (!month || !year || !salary) {
      return res.status(400).json({ message: "Tolong isi semua Form" });
    }

    const [userPayroll] = await Payroll.findAll({ where: { userId } });

    if (!userPayroll) {
      return res.status(400).json({ message: "ID User Tidak Tersedia!" });
    } else {
      const newPayroll = await Payroll.create({ userId, month, year, salary });
      res
        .status(201)
        .json({ message: "Payroll recorded successfully", newPayroll });
    }
  } catch (error) {
    next(error);
  }
});

// Route untuk mendapatkan data payroll berdasarkan ID pengguna (dapat diakses oleh pengguna yang terautentikasi)
router.get("/show", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const showPayroll = await Payroll.findAll({ where: { userId } });
    res.status(200).json({ showPayroll });
  } catch (error) {
    next(error);
  }
});

export default router;
