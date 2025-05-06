const express = require('express');
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const authRankMiddleware = require("../middleware/authRankMiddleware");

router.get("/profile", authenticateUser, userController.getUserById);
router.put("/update/:userId", authenticateUser, userController.updateUser);
router.put("/update-password", authenticateUser, userController.updatePassword);
router.get("/all", authenticateUser, authRankMiddleware("admin"), userController.getAllUsers);

module.exports = router;