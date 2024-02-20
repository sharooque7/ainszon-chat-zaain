const express = require("express");
const router = express.Router();
const {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipantById,
  deleteParticipantById,
} = require("../controllers/participantController");

router.post("/participants", createParticipant);
router.get("/participants", getAllParticipants);
router.get("/participants/:participantId", getParticipantById);
router.put("/participants/:participantId", updateParticipantById);
router.delete("/participants/:participantId", deleteParticipantById);

module.exports = router;
