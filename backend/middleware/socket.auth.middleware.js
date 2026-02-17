const { jwtService } = require("../service");
const { getUserDetailsById } = require("../service/auth/authService.service");
const { JWT_SECRET } = require("../utils/constant");

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized"));
    }

    const decoded = jwtService.verify(token, JWT_SECRET);

    const user = await getUserDetailsById(decoded.id);

    if (!user) {
      console.log("User not found");
      return next(new Error("Unauthorized"));
    }

    socket.user = user;
    socket.userId = user.id;

    console.log(`Socket authenticated for user: ${user.fullName} (${user.id})`);

    next();
  } catch (error) {
    console.log("Socket auth error:", error.message);
    next(new Error("Unauthorized"));
  }
};

module.exports = { socketAuthMiddleware };
