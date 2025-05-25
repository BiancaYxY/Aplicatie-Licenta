const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryController");
const authenticateUser = require("../middleware/authMiddleware");
const authRankMiddleware = require("../middleware/authRankMiddleware");

router.get("/payslip/download", authenticateUser, salaryController.downloadPayslip);
router.post("/set", authenticateUser, authRankMiddleware("manager"), salaryController.setSalary);
router.put("/update/:salaryId", authenticateUser, authRankMiddleware("manager"), salaryController.updateSalary);
router.get("/", authenticateUser, salaryController.getSalaryDetails);
router.get("/all", authenticateUser, authRankMiddleware("manager"), salaryController.getAllSalaries);


module.exports = router;