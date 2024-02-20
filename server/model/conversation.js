const { DataTypes } = require("sequelize");
const sequelize = require("../db/postgresql/sequilize");

const Conversation = sequelize.define(
  "Conversation",
  {
    conversation_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Set a default value using UUIDV4 function
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    // Additional options
    tableName: "conversations", // Specify the table name explicitly
    timestamps: true, // Set to true if you want Sequelize to manage createdAt and updatedAt automatically
    indexes: [
      {
        fields: ["createdAt"],
      },
      {
        fields: ["updatedAt"],
      },
    ],
    // paranoid: true,
  }
);

module.exports = Conversation;
