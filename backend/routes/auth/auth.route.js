const express = require("express");
const { authController } = require("../../controller");
const {
  validateSignup,
  validateLogin,
} = require("../../middleware/authValidation");
const auth = require("../../middleware/auth");
const upload = require("../../utils/upload");
const arcjetProtection = require("../../middleware/arcJet.middleware");

const router = express.Router(); // Corrected

// router.use(arcjetProtection);
// Example route
router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateLogin, authController.login);
router.put(
  "/updateprofile",
  upload.single("photo"),
  auth,
  authController.updateProfile
);

router.get("/me", auth, authController.getUserDetailsById);

router.post("/logout", auth, authController.logout);

module.exports = router;
