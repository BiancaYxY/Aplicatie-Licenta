const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const authenticateUser = require("../middleware/authMiddleware");

//angajatul trimite feedback catre user
router.post("/add", authenticateUser, feedbackController.addFeedback);



module.exports = router;