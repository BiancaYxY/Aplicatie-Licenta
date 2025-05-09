const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware");

router.get("/members", authenticateUser, authRankMiddleware("manager"), teamController.getTeamMembers);
router.get("/performance/total", authenticateUser, authRankMiddleware("manager"), teamController.getTeamPerformance);
router.get("/performance/:employeeId", authenticateUser, authRankMiddleware("manager"), teamController.getEmployeePerformance);


module.exports = router;