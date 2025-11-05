const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./router/user.routes");
const chatRouter = require("./router/chat.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.us
app.listen(process.env.PORT, () => {
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
