import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import sequelize from "../config/index.js";

// Import models
import createUserModel from "./entities/users.js";
import createUserProfileModel from "./entities/userProfile.js";
import createAttendanceModel from "./entities/attendance.js";
import createPayrollModel from "./entities/payroll.js";

// Initialize models
const User = createUserModel(sequelize, Sequelize.DataTypes);
const UserProfile = createUserProfileModel(sequelize, Sequelize.DataTypes);
const Attendance = createAttendanceModel(sequelize, Sequelize.DataTypes);
const Payroll = createPayrollModel(sequelize, Sequelize.DataTypes);

// Define associations
User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Attendance, { foreignKey: "userId" });
Attendance.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Payroll, { foreignKey: "userId" });
Payroll.belongsTo(User, { foreignKey: "userId" });

export { User, UserProfile, Attendance, Payroll };
