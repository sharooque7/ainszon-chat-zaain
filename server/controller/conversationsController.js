const Conversation = require("../model/conversation");
const Participant = require("../model/participants");

// Create a new conversation
async function createConversation(req, res) {
  try {
    const { type, user_id1, user_id2 } = req.body;
    const conversation = await Conversation.create({ type });
    const { conversation_id } = conversation;

    const participant = await Participant.bulkCreate([
      { conversation_id, type, user_id: user_id1 },
      { conversation_id, type, user_id: user_id2 },
    ]);
    res.status(201).json(conversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get all conversations
async function getAllConversations(req, res) {
  try {
    const conversations = await Conversation.findAll();
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error getting conversations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get conversation by ID
async function getConversationById(req, res) {
  try {
    const conversationId = req.params.conversationId;
    const conversation = await Conversation.findByPk(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error getting conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update conversation by ID
async function updateConversationById(req, res) {
  try {
    const conversationId = req.params.conversationId;
    const { type } = req.body;
    const [updatedRowsCount] = await Conversation.update(
      { type },
      { where: { conversation_id: conversationId } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json({ message: "Conversation updated successfully" });
  } catch (error) {
    console.error("Error updating conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete conversation by ID
async function deleteConversationById(req, res) {
  try {
    const conversationId = req.params.conversationId;
    const deletedRowsCount = await Conversation.destroy({
      where: { conversation_id: conversationId },
      individualHooks: true,
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createConversation,
  getAllConversations,
  getConversationById,
  updateConversationById,
  deleteConversationById,
};
