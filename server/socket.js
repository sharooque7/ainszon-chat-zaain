const { createConnection } = require("./db/redis/config");

async function socket_init(io) {
  io.on("connection", async (socket) => {
    console.log("connected");
    const client = await createConnection();
    await client.connect();

    // Store user information in Redis
    const sender = socket.handshake.headers.sender;
    const type = socket.handshake.headers.type;
    await client.hSet(
      "users",
      sender,
      JSON.stringify({ socketId: socket.id, type })
    );

    console.log("User added to Redis:", sender);

    // socket.on("private", async (message) => {
    //   // Extract receiver and message from the private message
    //   const receiver = message.receiver;
    //   const content = message.content;

    //   // Retrieve recipient's socket ID from Redis
    //   const recipientData = await client.hGet("users", receiver);
    //   if (recipientData) {
    //     const recipient = JSON.parse(recipientData);
    //     if (recipient.socketId) {
    //       // Emit the private message to the recipient's socket
    //       io.to(recipient.socketId).emit("private", {
    //         sender: sender,
    //         content: content,
    //       });
    //     } else {
    //       console.log(`Recipient ${receiver} is not connected`);
    //       socket.emit("private_error", {
    //         receiver: receiver,
    //         error: "Recipient is offline",
    //       });
    //     }
    //   } else {
    //     console.log(`Recipient ${receiver} not found`);
    //     socket.emit("private_error", {
    //       receiver: receiver,
    //       error: "Recipient not found",
    //     });
    //   }
    // });

    socket.on("private", async (message) => {
      // Extract receiver and message from the private message
      const receiver = message.receiver;
      const content = message.content;

      // Retrieve recipient's socket ID from Redis
      const recipientData = await client.hGet("users", receiver);
      if (recipientData) {
        const recipient = JSON.parse(recipientData);
        if (recipient.socketId) {
          // Emit the private message to the recipient's socket
          io.to(recipient.socketId).emit("private", {
            sender: sender,
            content: content,
          });
        } else {
          console.log(`Recipient ${receiver} is not connected`);
          socket.emit("private_error", {
            receiver: receiver,
            error: "Recipient is offline",
          });
        }
      } else {
        console.log(`Recipient ${receiver} not found`);
        socket.emit("private_error", {
          receiver: receiver,
          error: "Recipient not found",
        });
      }
    });

    socket.on("disconnect", async () => {
      const sender = socket.handshake.headers.sender;
      // Remove user from Redis on disconnect
      await client.hDel("users", sender);
      console.log("User removed from Redis:", sender);
    });
  });
}

module.exports = { socket_init };
