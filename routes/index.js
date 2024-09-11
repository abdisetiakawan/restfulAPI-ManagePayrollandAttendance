import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Welcome to the Payroll and Attendance Management System");
});

export default router;
