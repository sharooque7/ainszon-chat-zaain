// models/Message.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/postgresql/sequilize");
const Conversation = require("./conversation");
const User = require("./user");

const Message = sequelize.define(
  "Message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    conversation_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Conversation,
        key: "conversation_id",
      },
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
    indexes: [
      {
        fields: ["conversation_id"],
      },
      {
        fields: ["sender_id"],
      },
      {
        fields: ["createdAt"],
      },
    ],
  }
);

module.exports = Message;
