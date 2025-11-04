const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const secretKey = "your_secret_key"; 

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: "Access Token Required" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err) {
            return res.status(403).json({ message: "Invalid Access Token" });
        }
        req.user = user;
        next();
    });
};

module.exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
};