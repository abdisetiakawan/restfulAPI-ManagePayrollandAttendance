// Middleware untuk mengotorisasi pengguna dengan peran admin
function authorizeAdmin(req, res, next) {
  // Memeriksa apakah peran pengguna adalah 'admin'
  if (req.user.role !== "admin") {
    // Jika bukan admin, kembalikan status 403 (Forbidden) dengan pesan 'Access denied'
    return res.status(403).json({ message: "Access denied" });
  }
  // Jika pengguna adalah admin, lanjutkan ke middleware atau route handler berikutnya
  next();
}

// Mengekspor fungsi authorizeAdmin untuk digunakan di bagian lain aplikasi
module.exports = authorizeAdmin;
