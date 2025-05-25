const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");
const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware")

router.get("/", authenticateUser, announcementController.getAnnouncements);
router.post("/create", authenticateUser, authRankMiddleware("admin"), announcementController.postAnnouncement);
router.delete("/delete/:announcementId", authenticateUser, authRankMiddleware("admin"), announcementController.deleteAnnouncement);

module.exports = router;