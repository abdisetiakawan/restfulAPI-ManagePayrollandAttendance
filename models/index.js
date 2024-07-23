const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = require("../config/index");

// Import models
const User = require("./users")(sequelize, Sequelize.DataTypes);
const UserProfile = require("./userProfile")(sequelize, Sequelize.DataTypes);
const Attendance = require("./attendance")(sequelize, Sequelize.DataTypes);
const Payroll = require("./payroll")(sequelize, Sequelize.DataTypes);

// Define associations
User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Attendance, { foreignKey: "userId" });
Attendance.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Payroll, { foreignKey: "userId" });
Payroll.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, UserProfile, Attendance, Payroll };
