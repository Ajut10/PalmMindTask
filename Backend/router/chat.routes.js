const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat.controller");
const { authenticateToken } = require("../middleware/auth");

router.post("/send", authenticateToken, chatController.sendMessage);

router.get(
  "/messages/:receiverId",
  authenticateToken,
  chatController.getMessages
);

router.get("/count", authenticateToken, chatController.getChatCount);

module.exports = router;
