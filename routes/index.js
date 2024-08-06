var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send(
    "Welcome to the Payroll and Attendance Management System - Abdi Setiawan Testing cabang baru"
  );
});

module.exports = router;
