const { DataTypes } = require("sequelize");
const sequelize = require("../db/postgresql/sequilize");
const User = require("./user");

const Friend = sequelize.define(
  "Friend",
  {
    friend_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    user_id2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
  },
  {
    tableName: "friends",
    timestamps: true,
    indexes: [
      {
        fields: ["user_id1"],
      },
      {
        fields: ["user_id2"],
      },
      {
        fields: ["user_id1", "user_id2"],
      },
    ],
  }
);

module.exports = Friend;
