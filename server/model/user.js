const { DataTypes } = require("sequelize");
const sequelize = require("../db/postgresql/sequilize");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      require: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      require: true,
    },
    password_hash: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
    },
    bio: {
      type: DataTypes.TEXT,
    },
    profile_picture_url: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "users",
    paranoid: true,
    timestamps: true,
  }
);

module.exports = User;
