const Friend = require("../model/friend");

async function addFriend(req, res) {
  try {
    const { user_id1, user_id2 } = req.body;

    // Check if the friendship already exists
    const existingFriendship = await Friend.findOne({
      where: {
        user_id1,
        user_id2,
      },
    });
    if (existingFriendship) {
      return res.status(400).json({ error: "Friendship already exists" });
    }

    // Create the friendship
    const newFriendship = await Friend.create({ user_id1, user_id2 });
    res.status(201).json(newFriendship);
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function removeFriend(req, res) {
  try {
    const friendId = req.params.friendId;

    // Delete the friendship
    const deletedCount = await Friend.destroy({
      where: { friend_id: friendId },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Friendship not found" });
    }

    res.status(200).json({ message: "Friendship deleted successfully" });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addFriend,
  removeFriend,
};
