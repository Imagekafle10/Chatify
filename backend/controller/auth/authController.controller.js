const asyncHandler = require("../../middleware/validation");
const { authService, bcryptService, jwtService } = require("../../service");
const logger = require("../../utils/winstonLoggerConfig");
const {
  JWT_SECRET,
  JWT_EXPIRY,
  COOKIE_EXPIRY,
} = require("../../utils/constant");

const signup = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return next(new Error("Email Already Exist"));
    }

    // Hash password
    const hashedPassword = await bcryptService.hashPassword(password);

    // Create new user
    const user = await authService.createUser({
      fullName,
      email,
      password: hashedPassword,
    });

    // JWT payload
    const payload = {
      user_id: user.user_id,
      fullName: user.fullName,
      email: user.email,
    };

    // Generate token
    const access_token = await jwtService.generateToken(
      payload,
      JWT_SECRET,
      JWT_EXPIRY
    );

    // Send response
    return res
      .status(201)
      .cookie("access_token", access_token, {
        httpOnly: false,
        secure: false,
        maxAge: COOKIE_EXPIRY,
      })
      .json({
        success: true,
        message: "User created successfully",
      });
  } catch (error) {
    logger.error(
      `{Api:${req.url}, Error:${error.message}, stack:${error.stack} }`
    );
    next(error);
  }
});

module.exports = { signup };
