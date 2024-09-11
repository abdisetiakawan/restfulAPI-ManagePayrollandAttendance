import { Payroll, User } from "../../models/index.js";

// Mendapatkan semua data payroll (hanya untuk admin)
export const getAllPayrolls = async (req, res, next) => {
  try {
    const payroll = await Payroll.findAll({
      include: { model: User, attributes: ["username"] },
    });
    res.status(200).json({ payroll });
  } catch (error) {
    next(error);
  }
};

// Menambahkan data payroll baru (hanya untuk admin)
export const createPayroll = async (req, res, next) => {
  try {
    const { id, month, year, salary } = req.body;

    if (!month || !year || !salary) {
      return res.status(400).json({ message: "Tolong isi semua Form" });
    }

    const [userPayroll] = await User.findAll({ where: { id } });

    if (!userPayroll) {
      return res.status(400).json({ message: "ID User Tidak Tersedia!" });
    } else {
      const newPayroll = await Payroll.create({
        userId: id,
        month,
        year,
        salary,
      });
      res
        .status(201)
        .json({ message: "Payroll recorded successfully", newPayroll });
    }
  } catch (error) {
    next(error);
  }
};

// Mendapatkan data payroll berdasarkan ID pengguna (untuk pengguna terautentikasi)
export const getPayrollByUser = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const showPayroll = await Payroll.findAll({ where: { userId } });
    res.status(200).json({ showPayroll });
  } catch (error) {
    next(error);
  }
};
