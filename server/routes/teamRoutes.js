const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware");

router.get("/members", authenticateUser, authRankMiddleware("manager"), teamController.getTeamMembers);
router.get("/performance", authenticateUser, authRankMiddleware("manager"), teamController.getEmployeePerformance);

module.exports = router;