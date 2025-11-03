const userModel = require("../model/user.model");

module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Correct: use .save() on the instance
    const newUser = new userModel({ username, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
