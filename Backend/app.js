const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
const chatModel = require("./model/chat.model");
dotenv.config();

const userRouter = require("./router/user.routes");
const chatRouter = require("./router/chat.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/chats", chatRouter);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const users = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user-join", {
      message: `${username} joined the chat`,
    });
  });

  socket.on("message", async (data) => {
    const { username, message } = data;

    const savedMsg = await chatModel.create({
      sender: username,
      message,
    });

    io.emit("message", {
      username,
      message,
      _id: savedMsg._id,
    });
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    if (username) {
      socket.broadcast.emit("user-left", {
        message: `${username} left the chat`,
      });
      delete users[socket.id];
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
