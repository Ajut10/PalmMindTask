const  {authenticateToken,generateToken} = require("../middleware/auth.js");
const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
module.exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ username, email, password:hashedPassword });
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
  try{
    const {email , password }= req.body;
    const user = await userModel.findOne({email});
    if(user|| (await bcrypt.compare(password, user.password))){
      const token = generateToken(user);
    res.status(200).json({message: "Login Successful",  token, user});
      
    }else{
      res.status(401).json({message: "Invalid Credentials"});
    }
    
  }catch(error){
    console.error("Login Error:", error);
    res.status(500).json({message: "Error logging in user", error: error.message});
  }
};



module.exports.getUser= async (req, res) => {
  try{
    const {userId} = req.params;
    const user = await userModel.findById(userId);
    if(user){
      res.status(200).json({message: "User Found", user: user});
    }else{
      res.status(404).json({message: "User Not Found"});
    }
  }catch(error){
    console.error("Get User Error:", error);
    res.status(500).json({message: "Error fetching user", error: error.message});
  }
}

