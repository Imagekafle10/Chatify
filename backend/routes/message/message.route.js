const express = require("express");
const router = express.Router(); // Corrected

// Example route
router.get("/send", (req, res, next) => {
  res.send("send");
});

router.get("/receive", (req, res, next) => {
  res.send("Receive");
});

module.exports = router;
    