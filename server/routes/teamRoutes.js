const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware");
const teamController = require("../controllers/teamController");

router.get("/members", authenticateUser, authRankMiddleware("manager"), teamController.getTeamMembers);
router.get("/performance/:employeeId", authenticateUser,authRankMiddleware("manager"), teamController.getEmployeePerformance);
router.get("/performance/total", authenticateUser, authRankMiddleware("manager"), teamController.getTeamPerformance);

module.exports = router;
