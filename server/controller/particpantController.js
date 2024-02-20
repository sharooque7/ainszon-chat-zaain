const Participant = require("../models/Participant");

// Create a new participant
async function createParticipant(req, res) {
  try {
    const { user_id, conversation_id, type } = req.body;
    const participant = await Participant.create({
      user_id,
      conversation_id,
      type,
    });
    res.status(201).json(participant);
  } catch (error) {
    console.error("Error creating participant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get all participants
async function getAllParticipants(req, res) {
  try {
    const participants = await Participant.findAll();
    res.status(200).json(participants);
  } catch (error) {
    console.error("Error getting participants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get participant by ID
async function getParticipantById(req, res) {
  try {
    const participantId = req.params.participantId;
    const participant = await Participant.findByPk(participantId);

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.status(200).json(participant);
  } catch (error) {
    console.error("Error getting participant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update participant by ID
async function updateParticipantById(req, res) {
  try {
    const participantId = req.params.participantId;
    const { user_id, conversation_id, type } = req.body;
    const [updatedRowsCount] = await Participant.update(
      { user_id, conversation_id, type },
      { where: { participant_id: participantId } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.status(200).json({ message: "Participant updated successfully" });
  } catch (error) {
    console.error("Error updating participant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete participant by ID
async function deleteParticipantById(req, res) {
  try {
    const participantId = req.params.participantId;
    const deletedRowsCount = await Participant.destroy({
      where: { participant_id: participantId },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.status(200).json({ message: "Participant deleted successfully" });
  } catch (error) {
    console.error("Error deleting participant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipantById,
  deleteParticipantById,
};
