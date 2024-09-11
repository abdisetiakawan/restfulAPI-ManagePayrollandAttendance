import { v4 as uuidv4 } from "uuid";

const UserProfile = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    "UserProfile",
    {
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
          model: "Users",
          key: "id",
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  UserProfile.prototype.fullName = function () {
    return `${this.firstName} ${this.lastName}`;
  };

  return UserProfile;
};

export default UserProfile;
