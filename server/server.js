require("dotenv").config();
const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { Conversation, User, Friend, Message, Participant } = require("./model");
const { socket_init } = require("./socket");

const sequelize = require("./db/postgresql/sequilize");
const { createConnection } = require("./db/redis/config");

// Create an HTTP server and pass the Express app as a request listener
const server = http.createServer(app);

createConnection().then((client) => {
  console.log("Init Redis");
  client.connect();
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
    // Start your application logic here
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  }); // {force: true} will drop all tables before creating them again

const io = new Server(server, {
  path: "/socket.io",
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["content-type"],
  },
});
socket_init(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);
});
