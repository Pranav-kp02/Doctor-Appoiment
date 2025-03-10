const express = require("express");
const chatRoute = express.Router();
const { Chat } = require("../modules/messageSchema");

chatRoute.get("/chats", async (req, res) => {
  const { userId, docId } = req.query;
  // console.log(userId, docId);

  if (!userId || !docId) {
    return res.status(400).json({ error: "Missing userId or docId" });
  }

  try {
    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: docId },
        { senderId: docId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error("Database error:", err); // Log full error details
    res.status(500).json({ error: "Internal Server Error" });
  }
});

chatRoute.get("/patient-chats", async (req, res) => {
  const { docId, userId } = req.query;
  console.log(docId, userId);

  if (!docId || !userId) {
    return res.status(400).json({ error: "Missing docId or userId" });
  }

  try {
    const messages = await Chat.find({
      $or: [
        { senderId: docId, receiverId: userId },
        { senderId: userId, receiverId: docId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error("Database error:", err); // Log full error details
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = chatRoute;
