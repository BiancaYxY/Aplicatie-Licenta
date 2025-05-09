const express = require("express");
const router = express.Router();

router.use("/users", require("./userRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/feedback", require("./feedbackRoutes"));
router.use("/leave", require("./leaveRoutes"));
router.use("/salary", require("./salaryRoutes"));
router.use("/announcements", require("./annnouncementRoutes"));
router.use("/tasks", require("./taskRoutes"));
router.use("/team", require("./teamRoutes"));



module.exports = router;