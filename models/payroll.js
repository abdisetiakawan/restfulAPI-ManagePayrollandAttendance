const { v4: uuidv4 } = require("uuid");
const { User } = require("./index");

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

module.exports = Payroll;
