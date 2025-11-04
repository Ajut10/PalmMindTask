const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { authenticateToken } = require("../middleware/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", authenticateToken,userController.getAllUsers);
router.delete("/deleteUser/:id",authenticateToken, userController.deleteUser);


module.exports = router;
