const express = require("express");
const router = express.Router();

const {
  createConversation,
  getAllConversations,
  deleteConversationById,
} = require("../controller/conversationsController");

router.post("/conversations", createConversation);
router.get("/conversations", getAllConversations);
router.delete("/conversations/:conversationId", deleteConversationById);

module.exports = router;
