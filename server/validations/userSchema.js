const { z } = require("zod");

// Define Zod schema for the User model
const userSchema = z.object({
  username: z.string().min(3).max(50), // Username must be a string with length between 3 and 50 characters
  email: z.string().email().max(100), // Email must be a valid email address and have maximum length of 100 characters
  password: z.string().min(6).max(100), // Password hash must be a string with length between 6 and 100 characters
  full_name: z.string().max(100).optional(), // Full name is optional but if provided, it must be a string with maximum length of 100 characters
  bio: z.string().optional(), // Bio is optional but if provided, it must be a string
  profile_picture_url: z.string().max(255).optional(), // Profile picture URL is optional but if provided, it must be a string with maximum length of 255 characters
});

module.exports = userSchema;
