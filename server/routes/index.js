const express = require("express");
const router = express.Router();

//  Importa și conecteaza toate rutele per modul
router.use("/users", require("./userRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/feedback", require("./feedbackRoutes"));
router.use("/leave", require("./feedbackRoutes"));
router.use("/salary", require("./salaryRoutes"));
// Ex: router.use("/auth", require("./authRoutes")); // pentru autentificare
// Ex: router.use("/feedback", require("./feedbackRoutes")); // pentru feedback

module.exports = router;