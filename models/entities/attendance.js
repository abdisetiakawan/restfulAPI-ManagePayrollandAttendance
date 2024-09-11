import { v4 as uuidv4 } from "uuid";
import { User } from "../index.js";

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

export default Attendance;
