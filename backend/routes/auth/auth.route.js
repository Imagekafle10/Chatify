const express = require("express");
const { authController } = require("../../controller");
const { validateSignup } = require("../../middleware/authValidation");
const auth = require("../../middleware/auth");
const router = express.Router(); // Corrected

// Example route
router.post("/signup", validateSignup, authController.signup);

router.post("/login", authController.login);

router.post("/logout", auth, authController.logout);

module.exports = router;
