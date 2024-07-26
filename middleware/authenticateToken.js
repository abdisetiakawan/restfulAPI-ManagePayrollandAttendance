// Mengimpor modul jsonwebtoken untuk menangani JWT
const jwt = require("jsonwebtoken");

// Memuat variabel lingkungan dari file .env
require("dotenv").config();

// Middleware untuk mengautentikasi token JWT
function authenticateToken(req, res, next) {
  // Mendapatkan header Authorization dari permintaan
  const authHeader = req.headers["authorization"];

  // Memisahkan token dari header jika ada
  const token = authHeader && authHeader.split(" ")[1];

  // Jika token tidak ada, kembalikan status 401 (Unauthorized)
  if (token == null) return res.sendStatus(401);

  // Verifikasi token menggunakan rahasia yang disimpan di variabel lingkungan
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Jika terjadi kesalahan saat verifikasi, kembalikan status 403 (Forbidden)
    if (err) return res.sendStatus(403);

    // Jika token valid, simpan informasi pengguna dalam objek permintaan
    req.user = user;

    // Lanjutkan ke middleware atau route handler berikutnya
    next();
  });
}

// Mengekspor fungsi authenticateToken untuk digunakan di bagian lain aplikasi
module.exports = authenticateToken;
