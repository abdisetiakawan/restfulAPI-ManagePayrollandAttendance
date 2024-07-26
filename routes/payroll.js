var express = require("express");
var router = express.Router();
const { Payroll, User } = require("../models/index");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeAdmin = require("../middleware/authorizeAdmin");

// Route untuk mendapatkan data payroll untuk semua pengguna (hanya untuk admin)
router.get("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    // Mengambil semua data payroll dan menyertakan informasi pengguna (username)
    const payroll = await Payroll.findAll({
      include: { model: User, attributes: ["username"] },
    });
    // Mengirimkan response dengan status 200 dan data payroll
    res.status(200).json({ payroll });
  } catch (error) {
    // Menangani error dengan meneruskan ke error handler
    next(error);
  }
});

// Route untuk menambahkan data payroll baru (hanya untuk admin)
router.post("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const { userId, month, year, salary } = req.body;

    // Memeriksa apakah semua field yang diperlukan sudah diisi
    if (!month || !year || !salary) {
      return res.status(400).json({
        message: "Tolong isi semua Form",
      });
    }

    // Memeriksa apakah ID pengguna yang diberikan ada di dalam sistem
    const [userPayroll] = await Payroll.findAll({ where: { userId } });

    if (!userPayroll) {
      return res.status(400).json({ message: "ID User Tidak Tersedia!" });
    } else {
      // Membuat data payroll baru
      const newPayroll = await Payroll.create({ userId, month, year, salary });
      // Mengirimkan response dengan status 201 dan data payroll yang baru dibuat
      res
        .status(201)
        .json({ message: "Payroll recorded successfully", newPayroll });
    }
  } catch (error) {
    // Menangani error dengan meneruskan ke error handler
    next(error);
  }
});

// Route untuk mendapatkan data payroll berdasarkan ID pengguna (dapat diakses oleh pengguna yang terautentikasi)
router.get("/show", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.userId; // Mendapatkan ID pengguna dari token
    // Mengambil data payroll berdasarkan ID pengguna
    let showPayroll = await Payroll.findAll({ where: { userId } });
    // Mengirimkan response dengan status 200 dan data payroll
    res.status(200).json({ showPayroll });
  } catch (error) {
    // Menangani error dengan meneruskan ke error handler
    next(error);
  }
});

module.exports = router;
