var express = require('express');
var router = express.Router();
const { User, UserProfile } = require('../models/index');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.get('/', authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: UserProfile,
      attributes: ['id', 'username', 'role']
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
});


router.put('/profile', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;
    let { firstName, lastName, email, phoneNumber, address, dateOfBirth, position } = req.body;

    if (userRole === 'admin') {
      position = 'Admin Pengelola Karyawan';
    }

    let userProfile = await UserProfile.findOne({ where: { userId } });

    if (userProfile) {
      // Jika userProfile ditemukan, perbarui profilnya
      userProfile = await userProfile.update({
        firstName, lastName, email, phoneNumber, address, dateOfBirth, position
      });

      res.status(200).json({ message: 'Profile updated successfully', userProfile });
    } else {
      // Jika userProfile tidak ditemukan, buat profil baru
      userProfile = await UserProfile.create({
        userId, firstName, lastName, email, phoneNumber, address, dateOfBirth, position
      });

      res.status(200).json({ message: 'Profile created successfully', userProfile });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;



