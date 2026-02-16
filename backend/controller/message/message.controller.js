const { Op } = require("sequelize");
const asyncHandler = require("../../middleware/validation");
const { messageService, authService } = require("../../service");

const getAllContacts = asyncHandler(async (req, res, next) => {
  try {
    const loginUserId = req.user.id;
    const filteredUsers = await messageService.filteredUserService(loginUserId);

    res.status(201).json({
      success: true,
      filteredUsers,
    });
  } catch (error) {
    logger.error(
      `{Api:${req.url}, Error:${error.message}, stack:${error.stack} }`,
    );
  }
});

const getmessagesByUserId = asyncHandler(async (req, res, next) => {
  const myId = req.user.id;
  const { id: userToChatId } = req.params;
  const messages = await messageService.getmessagesByUserIdService(
    myId,
    userToChatId,
  );
  res.status(201).json({
    success: true,
    messages,
  });
});

const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    // Validate text or image
    if (!text && !req.file) {
      return next("Text or image is required.");
    }

    // Cannot send to yourself
    if (senderId === Number(receiverId)) {
      return next("Cannot send messages to yourself.");
    }

    // Check if receiver exists
    const receiverExists = await authService.getUserDetailsById(receiverId);
    if (!receiverExists) {
      return next(new Error("Receiver not found."));
    }

    // If multer image uploaded
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
    }

    // Create message
    const newMessage = await messageService.newMessageService({
      senderId,
      receiverId,
      text: text || null,
      image: imageUrl,
    });

    // Emit via socket.io
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getChatPartners = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req?.user?.id;

  const chatPartners =
    await messageService.getChatPartnersService(loggedInUserId);

  res.status(201).json({
    success: true,
    chatPartners,
  });
});

module.exports = {
  getAllContacts,
  getmessagesByUserId,
  sendMessage,
  getChatPartners,
};
