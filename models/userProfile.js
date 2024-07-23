const { v4: uuidv4 } = require("uuid");

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
          model: "Users", // Menggunakan nama model secara langsung untuk menghindari circular dependency
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
      timestamps: true, // Mengaktifkan timestamps pada model ini
    }
  );
  // Menambahkan getter fullName
  UserProfile.prototype.fullName = function () {
    return `${this.firstName} ${this.lastName}`;
  };
  return UserProfile;
};

module.exports = UserProfile;
