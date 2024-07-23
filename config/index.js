const { Sequelize } = require("sequelize");
require("dotenv").config();

// Sesuaikan konfigurasi database Anda di sini
const sequelize = new Sequelize({
  dialect: "mysql", // Ganti dengan dialect database yang Anda gunakan
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME, // Ganti dengan nama database Anda
});

module.exports = sequelize;
