const { authenticateToken, generateToken } = require("../middleware/auth.js");
const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
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

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user || (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user);
      res.status(200).json({ message: "Login Successful", token, user });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};
module.exports.getAllUsers = async (req, res) => {
  try {
    if(req.user.role !=='admin'){
      return res.status(403).json({message:"Access denied"})
    }else{

      const users = await userModel.find();
      res.status(200).json({ users });
    }
  } catch (error) {
    console.error("Get Users Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(userId, updates, { new: true });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try{
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch(error){
    console.error("Delete User Error:", error);
  }}