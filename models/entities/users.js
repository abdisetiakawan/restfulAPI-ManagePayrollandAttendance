import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const User = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "karyawan"),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
    },
  });
};

export default User;
