import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import styles from "./ChatDoctor.module.css";
import { API } from "../AXIOS";

// Create socket connection once
const socket = io("http://localhost:3002");

const ChatDoctor = () => {
  const { id: docId } = useParams();

  const userId = useSelector(
    (state) => state.userAth.user?.id || state.userAth.user?._id || ""
  );

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Register user and fetch chat history
  useEffect(() => {
    if (!userId) return;

    socket.emit("register", userId);
    setIsLoading(true);
    API.get(`/chats?userId=${userId}&docId=${docId}`)

      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error("Error fetching chat history:", err))
      .finally(() => setIsLoading(false));

    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on(`receiveMessage-${userId}`, handleNewMessage);

    return () => {
      socket.off(`receiveMessage-${userId}`, handleNewMessage);
    };
  }, [userId, docId]);

  // Send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    const newMessage = {
      senderId: userId,
      receiverId: docId,
      message: msg.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMsg("");
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Format timestamp
  const formatTime = (timestamp) => {
    return timestamp
      ? new Date(timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
  };

  return (
    <div className={styles.main}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <div className={styles.chatTitle}>Chat with your Patient</div>
        </div>

        <div className={styles.messagesContainer}>
          {isLoading ? (
            <div className={styles.loadingIndicator}>Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className={styles.emptyChat}>
              No messages yet. Send a message to start the conversation.
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.messageItem} ${
                  message.senderId === userId
                    ? styles.sentMessage
                    : styles.receivedMessage
                }`}
              >
                <div className={styles.messageContent}>{message.message}</div>
                <div className={styles.messageTime}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <form className={styles.inputForm} onSubmit={sendMessage}>
            <input
              type="text"
              className={styles.messageInput}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatDoctor;
