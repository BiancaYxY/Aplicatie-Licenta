const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController")
const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware");

router.post("/request", authenticateUser, leaveController.requestLeave);
router.get("/status", authenticateUser, leaveController.getLeaveStatus);
router.put("/set-status", authenticateUser, authRankMiddleware("manager"), leaveController.setLeaveStatus);
router.get("/", authenticateUser, authRankMiddleware("manager"), leaveController.getTeamLeaves);


module.exports = router;