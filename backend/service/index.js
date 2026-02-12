const authService = require("./auth/authService.service");
const jwtService = require("./auth/jwtService.service");
const bcryptService = require("./auth/bcrypt.service");
const messageService = require("./message/message.service");

module.exports = { authService, jwtService, bcryptService, messageService };
