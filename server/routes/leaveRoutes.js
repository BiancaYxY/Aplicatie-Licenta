const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController")
const authenticateUser = require("../middleware/authMiddleware");

router.post("/request", authenticateUser, leaveController.requestLeave);
router.get("/status", authenticateUser, leaveController.getLeaveStatus);

module.exports = router;