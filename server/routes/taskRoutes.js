const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware");


router.get("/", authenticateUser, taskController.getAssignedTasks);
router.put("/update-status", authenticateUser, taskController.updateTaskStatus);
router.post("/assign", authenticateUser, authRankMiddleware("manager"), taskController.assignTask);
router.delete("/:taskId", authenticateUser, authRankMiddleware("manager"), taskController.deleteTask);


module.exports = router;