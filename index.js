require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var attendanceRouter = require("./routes/attendance");
var payrollRouter = require("./routes/payroll");
var authRouter = require("./routes/auth");
var sequelize = require("./config/index");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/attendance", attendanceRouter);
app.use("/payroll", payrollRouter);
app.use("/auth", authRouter);

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/home", (req, res) => {
  res.send("Hello, world!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send the error response
  res.status(err.status || 500).send({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});
