const express = require("express");
const router = express.Router();

// Rută de test
router.get("/test", (req, res) => {
  res.send("✅ Funcționează ruta /api/test!");
});

module.exports = router;
