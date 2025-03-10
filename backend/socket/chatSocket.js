const { Chat } = require("../modules/messageSchema");

const users = {};

module.exports = function (io) {
  io.on("connection", (socket) => {
    // Register user with socket
    socket.on("register", (userId) => {
      users[userId] = socket.id;
      // console.log(socket.id);
    });

    // Listen for messages
    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, message } = data;
      const newMessage = new Chat({ senderId, receiverId, message });
      await newMessage.save();

      // Send message to the receiver
      const receiverSocketId = users[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(
          `receiveMessage-${receiverId}`,
          newMessage
        );
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      for (let userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
        }
      }
    });
  });
};
