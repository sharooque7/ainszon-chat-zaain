const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controller/userController");

// Define routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/", updateUserById);
router.delete("/users/:id", deleteUserById);

module.exports = router;
