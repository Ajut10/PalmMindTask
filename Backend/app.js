const express = require("express");
const mongoose = require("mongoose");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./router/user.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
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
