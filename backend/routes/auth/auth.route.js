const express = require("express");
const { authController } = require("../../controller");
const {
  validateSignup,
  validateLogin,
} = require("../../middleware/authValidation");
const auth = require("../../middleware/auth");
const router = express.Router(); // Corrected

// Example route
router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateLogin, authController.login);

router.post("/logout", auth, authController.logout);

module.exports = router;
