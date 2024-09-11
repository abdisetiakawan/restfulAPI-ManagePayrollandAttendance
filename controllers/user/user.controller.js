import { User, UserProfile } from "../../models/index.js";

// Mendapatkan semua pengguna beserta profil mereka (untuk admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: UserProfile,
      attributes: ["id", "username", "role"],
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// Mengupdate profil pengguna (dapat diakses oleh pengguna yang terautentikasi)
export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;
    let {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      position,
    } = req.body;

    // Jika pengguna adalah admin, posisi ditetapkan sebagai Admin Pengelola Karyawan
    if (userRole === "admin") {
      position = "Admin Pengelola Karyawan";
    }

    // Cek apakah profil pengguna sudah ada
    let userProfile = await UserProfile.findOne({ where: { userId } });

    // Jika profil ada, update profilnya
    if (userProfile) {
      userProfile = await userProfile.update({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        position,
      });

      res.status(200).json({
        message: "Profile updated successfully",
        userProfile,
      });
    } 
    // Jika tidak ada, buat profil baru
    else {
      userProfile = await UserProfile.create({
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        position,
      });

      res.status(200).json({
        message: "Profile created successfully",
        userProfile,
      });
    }
  } catch (error) {
    next(error);
  }
};
