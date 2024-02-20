const { User } = require("../model/index");
const bcrypt = require("bcrypt");
const userSchema = require("../validations/userSchema");

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createUser(req, res, next) {
  try {
    const { user } = req.body;

    userSchema.parse(user);

    const isEmailExist = await User.findOne({
      where: {
        email: user?.email,
      },
    });

    if (isEmailExist) {
      const error = new Error();
      error.status = 409;
      error.message = "Email already exists";
      throw error;
    }

    const saltRounds = 10; // You can adjust the number of salt rounds based on your security requirements
    const hashedPassword = await bcrypt.hash(user?.password, saltRounds);

    const newUser = await User.create({
      username: user?.username,
      email: user?.email,
      password_hash: hashedPassword,
      full_name: user?.full_name,
      bio: user?.bio,
      profile_picture_url: user?.profile_picture_url,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Get all users
async function getAllUsers(req, res, next) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
    // res.status(500).json({ message: "Failed to fetch users" });
  }
}

// Get user by ID
async function getUserById(req, res, next) {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
}

// Update user by ID
async function updateUserById(req, res, next) {
  const { user } = req.body;
  console.log(user);
  try {
    const [updated] = await User.update(user, {
      where: { user_id: user.user_id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(user.user_id);
      return res.status(200).json(updatedUser);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    next(error);
    console.error("Error updating user:", error);
    // res.status(500).json({ message: "Failed to update user" });
  }
}

// Delete user by ID
async function deleteUserById(req, res) {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({
      where: { user_id: userId },
    });
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
}

// Export controller functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
