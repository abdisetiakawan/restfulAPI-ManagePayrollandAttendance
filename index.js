// Import dotenv
import dotenv from "dotenv";
dotenv.config();

// Import dependencies
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

// Import routers and config
import usersRouter from "./routes/users.js";
import attendanceRouter from "./routes/attendance.js";
import payrollRouter from "./routes/payroll.js";
import authRouter from "./routes/auth.js";
import sequelize from "./config/index.js";

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
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

// Set up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

app.get("/", (req, res) => {
  res.send("Selamat datang di API Absensi dan Payroll Karyawan");
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send error response
  res.status(err.status || 500).send({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});
