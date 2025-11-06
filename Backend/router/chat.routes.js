const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat.controller");
const { authenticateToken } = require("../middleware/auth");



router.get("/count", authenticateToken, chatController.getChatCount);

module.exports = router;
