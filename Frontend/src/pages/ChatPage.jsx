import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Navbar from "../../component/Navbar";
const socket = io("http://localhost:3000");

const ChatPage = () => {
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [username, setUsername] = useState(user ? user.username : "");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, { type: "chat", ...msg }]);
    });

    socket.on("user-join", (data) => {
      setMessages((prev) => [...prev, { type: "join", ...data }]);
    });

    socket.on("user-left", (data) => {
      setMessages((prev) => [...prev, { type: "left", ...data }]);
    });

    return () => {
      socket.off("message");
      socket.off("user-join");
      socket.off("user-left");
    };
  }, []);
  const joinChat = () => {
    if (!username.trim()) return;
    socket.emit("join", username);
    setJoined(true);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    const msgData = { username, message };
    socket.emit("message", msgData);
    setMessage("");
  };

  return (
    <div>
      <Navbar user={user} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {!joined ? (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
            <h1 className="text-xl font-bold mb-4">Join the Chat</h1>
            <input
              type="text"
              placeholder="Enter your name..."
              value={user.username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
            <button
              onClick={joinChat}
              className="bg-purple-500 text-white px-4 py-2 rounded w-full"
            >
              Join
            </button>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-center mb-3">
              Live Chat
            </h2>

            <div className="h-64 overflow-y-auto border p-2 rounded mb-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`my-1 p-2 rounded text-sm ${
                    msg.type === "join"
                      ? "text-green-600 text-center"
                      : msg.type === "left"
                      ? "text-red-600 text-center"
                      : msg.username === username
                      ? "bg-blue-100 text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  {msg.type === "chat" ? (
                    <>
                      <p>{msg.message}</p>
                      <small className="text-xs text-gray-500">
                        {msg.username}
                      </small>
                    </>
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border p-2 rounded-l"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-500 text-white px-4 rounded-r"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
