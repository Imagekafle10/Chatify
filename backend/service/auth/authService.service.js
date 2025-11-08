const User = require("../../Model/User");
const logger = require("../../utils/winstonLoggerConfig");

const findUserByEmail = async (email) => {
  try {
    const existingUser = await User.findOne({
      where: { email: email },
    });
    return existingUser;
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const createUser = async (data) => {
  try {
    const existingUser = await User.create(data);
    return existingUser;
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { findUserByEmail, createUser };
