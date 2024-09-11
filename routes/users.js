import express from "express";
import { User, UserProfile } from "../models/index.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: UserProfile,
      attributes: ["id", "username", "role"],
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
});

router.put("/profile", authenticateToken, async (req, res, next) => {
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

    if (userRole === "admin") {
      position = "Admin Pengelola Karyawan";
    }

    let userProfile = await UserProfile.findOne({ where: { userId } });

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

      res
        .status(200)
        .json({ message: "Profile updated successfully", userProfile });
    } else {
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

      res
        .status(200)
        .json({ message: "Profile created successfully", userProfile });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
