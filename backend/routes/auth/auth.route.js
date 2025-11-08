const express = require("express");
const { authController } = require("../../controller");
const { validateSignup } = require("../../middleware/authValidation");
const router = express.Router(); // Corrected

// Example route
router.post("/signup", validateSignup, authController.signup);

router.get("/login", (req, res, next) => {
  res.send("Login");
});

router.get("/logout", (req, res, next) => {
  res.send("Logout");
});

module.exports = router;
