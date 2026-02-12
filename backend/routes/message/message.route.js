const express = require("express");
const { messageController } = require("../../controller");
const auth = require("../../middleware/auth");
const upload = require("../../utils/upload");
const arcjetProtection = require("../../middleware/arcJet.middleware");
const router = express.Router(); // Corrected
router.use(arcjetProtection);

// Example route
router.get("/contacts", auth, messageController.getAllContacts);
router.get("/chats", auth, messageController.getChatPartners);
router.get("/:id", auth, messageController.getmessagesByUserId);
router.post(
  "/send/:id",
  upload.single("photo"),
  auth,
  messageController.sendMessage
);

module.exports = router;
