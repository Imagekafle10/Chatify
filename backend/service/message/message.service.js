const { Op } = require("sequelize");
const User = require("../../Model/User");
const logger = require("../../utils/winstonLoggerConfig");
const Message = require("../../Model/Message");

const filteredUserService = async (loginUserId) => {
  try {
    const result = User.findAll({
      where: {
        id: {
          [Op.ne]: loginUserId,
        },
      },
      attributes: { exclude: ["password"] },
    });
    return result;
  } catch (error) {
    logger.error(` Error:${error.message}, stack:${error.stack} }`);
  }
};

const getmessagesByUserIdService = async (myId, userToChatId) => {
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ senderId: myId }, { receiverId: userToChatId }],
          },
          {
            [Op.and]: [{ senderId: userToChatId }, { receiverId: myId }],
          },
        ],
      },
    });
    return messages;
  } catch (error) {
    logger.error(` Error:${error.message}, stack:${error.stack} }`);
  }
};

const newMessageService = async (data = {}) => {
  const { text, imageUrl, senderId, receiverId } = data;
  try {
    const messge = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    return messge;
  } catch (error) {
    logger.error(` Error:${error.message}, stack:${error.stack} }`);
  }
};

const getChatPartnersService = async (loggedInUserId) => {
  const messages = await Message.findAll({
    where: {
      [Op.or]: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    },
    attributes: ["senderId", "receiverId"],
  });

  const chatPartnerIds = [
    ...new Set(
      messages.map((msg) =>
        msg.senderId === loggedInUserId ? msg.receiverId : msg.senderId
      )
    ),
  ];

  const chatPartners = await User.findAll({
    where: {
      id: {
        [Op.in]: chatPartnerIds,
      },
    },
    attributes: { exclude: ["password"] },
  });

  return chatPartners;
};

module.exports = {
  filteredUserService,
  getmessagesByUserIdService,
  newMessageService,
  getChatPartnersService,
};
