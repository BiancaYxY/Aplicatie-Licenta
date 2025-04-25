const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryController");
const authenticateUser = require("../middleware/authMiddleware");

router.get("/payslip/download", authenticateUser, salaryController);