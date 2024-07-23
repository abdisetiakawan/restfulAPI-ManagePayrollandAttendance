var express = require('express');
var router = express.Router();
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Please provide username, password, and role' });
    }
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = await User.create({ username, password, role });
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    const userId = user.id;
    const accessToken = jwt.sign({ userId, username, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    });
    const refreshToken = jwt.sign({ userId, username, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });
    await User.update({ refreshToken }, { where: { id: userId } });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
