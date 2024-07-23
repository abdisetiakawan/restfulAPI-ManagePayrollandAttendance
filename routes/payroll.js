var express = require('express');
var router = express.Router();
const { Payroll, User } = require('../models/index');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.get('/', authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const payroll = await Payroll.findAll({
      include: { model: User, attributes: ['username'] }
    });
    res.status(200).json({ payroll });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const { userId, month, year, salary } = req.body;
    if(!month || !year || !salary){
      res.status(400).json({
        message: "Tolong isi semua Form"
      })
    }
    
    const [userPayroll] = await Payroll.findAll({where: {userId}})
    
    if(!userPayroll){
      res.status(400).json({message: "ID User Tidak Tersedia!"})
    } else {
      const newPayroll = await Payroll.create({ userId, month, year, salary });
      res.status(201).json({ message: 'Payroll recorded successfully', newPayroll });
    }


  } catch (error) {
    next(error);
  }
});

router.get('/show', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    let showPayroll = await Payroll.findAll({ where: { userId } });
    res.status(200).json({ showPayroll });
  } catch (error) {
    next(error)
  }
})

module.exports = router;
