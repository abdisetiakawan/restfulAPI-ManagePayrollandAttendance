import { v4 as uuidv4 } from "uuid";
import { User } from "../index.js";

const Payroll = (sequelize, DataTypes) => {
  return sequelize.define("Payroll", {
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
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};

export default Payroll;
