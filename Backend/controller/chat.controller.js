const chatModel = require("../model/chat.model");
const userModel = require("../model/user.model");

module.exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message text is required" });
    }

    const newMessage = await chatModel.create({
      sender: req.user.id,
      receiver: receiverId || null,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      chat: newMessage,
    });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({
      message: "Error sending message",
      error: error.message,
    });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;

    const userId = req.user.id;

    const messages = await chatModel
      .find({
        $or: [
          { sender: userId, receiver: receiverId },
          { sender: receiverId, receiver: userId },
        ],
      })
      .populate("sender", "username email")
      .populate("receiver", "username email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
};

module.exports.getChatCount = async (req, res) => {
  try {
    // Optional: Only allow admins to view stats
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalChats = await chatModel.countDocuments();
    const totalUsers = await userModel.countDocuments();

    res.status(200).json({
      totalChats,
      totalUsers,
      message: "Chat and user counts fetched successfully",
    });
  } catch (error) {
    console.error("Error counting chats:", error);
    res.status(500).json({
      message: "Error counting chats",
      error: error.message,
    });
  }
};

module.exports.getUserCount = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting users", error: error.message });
  }
};
