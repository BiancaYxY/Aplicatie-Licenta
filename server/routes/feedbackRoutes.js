const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware");

router.post("/add", authenticateUser, feedbackController.addFeedback);
router.get("/received", authenticateUser, authRankMiddleware("manager", feedbackController.getFeedbackByManager));
router.get("/nps", authenticateUser, authRankMiddleware("manager", feedbackController.generateNPSReport));
router.get("/summary", authenticateUser, authRankMiddleware("manager"), feedbackController.summarizeFeedback);


module.exports = router;