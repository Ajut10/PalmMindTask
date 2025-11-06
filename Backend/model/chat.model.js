const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      ref: "User",
      required: true,
    },
    receiver: {
      type: String,
      ref: "User",
      required: false,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    room: {
      type: String,
      default: "global",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);

 
