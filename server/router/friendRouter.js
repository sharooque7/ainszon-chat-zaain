const express = require("express");
const router = express.Router();
const { addFriend, removeFriend } = require("../controller/friendController");

router.post("/friends", addFriend);
router.delete("/friends/:friendId", removeFriend);

module.exports = router;
