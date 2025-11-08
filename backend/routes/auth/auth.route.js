const express = require("express");
const router = express.Router(); // Corrected

// Example route
router.get("/signup", (req, res, next) => {
  res.send("signup");
});

router.get("/login", (req, res, next) => {
  res.send("Login");
});

router.get("/logout", (req, res, next) => {
  res.send("Logout");
});

module.exports = router;
