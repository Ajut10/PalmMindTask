const chatModel = require("../model/chat.model");
const userModel = require("../model/user.model");


module.exports.getChatCount = async (req, res) => {
  try {
    
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

