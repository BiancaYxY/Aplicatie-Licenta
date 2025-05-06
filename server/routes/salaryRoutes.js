const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryController");
const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware");

router.get("/payslip/download", authenticateUser, salaryController.downloadPayslip);
router.post("/set", authenticateUser, authRankMiddleware("admin"), salaryController.setSalary);
router.put("/update/:salaryId", authenticateUser, authRankMiddleware("admin"), salaryController.updateSalary);

module.exports = router;