const { createClient } = require("redis");
const { promisify } = require("util");

async function createConnection() {
  // Create the Redis client
  const client = await createClient();

  // Set up error event handler
  client.on("error", (err) => console.log("Redis Client Error", err));

  // Log successful connection
  client.on("ready", () => {
    console.log("Redis client connected successfully");
  });
  return client;

  // Promisify Redis commands

  // Return promisified versions of Redis commands
}

module.exports = { createConnection };
