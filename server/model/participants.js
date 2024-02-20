// models/Participant.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/postgresql/sequilize");
const User = require("./user");
const Conversation = require("./conversation");

const Participant = sequelize.define(
  "Participant",
  {
    participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
        onDelete: "CASCADE",
      },
    },
    conversation_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Conversation,
        key: "conversation_id",
        onDelete: "CASCADE",
      },
    },
    type: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "participants",
    timestamps: true,
    // paranoid: true,
    // Optionally, specify the table name if it differs from the model name
    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["conversation_id"],
      },
    ],
  }
);

module.exports = Participant;
