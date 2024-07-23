const { v4: uuidv4 } = require("uuid");
const { User } = require("./index");

const Attendance = (sequelize, DataTypes) => {
  return sequelize.define("Attendance", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      defaultValue: () => uuidv4(),
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("present", "absent", "leave", "half-day"),
      allowNull: false,
    },
  });
};

module.exports = Attendance;
