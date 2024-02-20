const Conversation = require("./conversation");
const User = require("./user");
const Friend = require("./friend");
const Message = require("./message");
const Participant = require("./participants");

// Define associations
User.hasMany(Friend, { foreignKey: "user_id1" });
User.hasMany(Friend, { foreignKey: "user_id2" });
Friend.belongsTo(User, { foreignKey: "user_id1" });
Friend.belongsTo(User, { foreignKey: "user_id2" });

User.hasMany(Participant, { foreignKey: "user_id" });
Participant.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Message, { foreignKey: "sender_id" });
Message.belongsTo(User, { foreignKey: "sender_id" });

Conversation.hasMany(Participant, {
  foreignKey: "conversation_id",
  onDelete: "CASCADE",
  hooks: true,
});
Participant.belongsTo(Conversation, {
  foreignKey: "conversation_id",
});

Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

module.exports = {
  Conversation,
  User,
  Friend,
  Message,
  Participant,
};
