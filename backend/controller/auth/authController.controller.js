const asyncHandler = require("../../middleware/validation");
const { authService, bcryptService, jwtService } = require("../../service");
const logger = require("../../utils/winstonLoggerConfig");
const {
  JWT_SECRET,
  JWT_EXPIRY,
  COOKIE_EXPIRY,
  CLIENT_URL,
  REFRESH_SECRET,
  REFRESH_EXPIRY,
} = require("../../utils/constant");
const { sendWelcomeEmail } = require("../../emails/emailHandler");
const { updateProfileById } = require("../../service/auth/authService.service");

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
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };

    // Generate token
    const access_token = await jwtService.generateToken(
      payload,
      JWT_SECRET,
      JWT_EXPIRY
    );

    try {
      await sendWelcomeEmail(email, fullName, CLIENT_URL);
    } catch (error) {
      logger.error("Falied To send Welcome Message");
    }

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

const login = asyncHandler(async (req, res, next) => {
  const { email, password, captchaResponse } = req.body;
  // console.log(captchaResponse);

  // const captchaVerification = await authService.verifyCaptchaResponse(
  //   captchaResponse
  // );
  // if (!captchaVerification) {
  //   return CustomErrorHandler.inValidCaptchaResponse();
  // }

  const responeData = await authService.findUserByEmail(email);

  const user = responeData;
  const validatePassword = await bcryptService.comparePassword(
    password,
    user?.password
  );

  if (!user || !validatePassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  //generate access token and refresh token
  const payload = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };

  const access_token = await jwtService.generateToken(
    payload,
    JWT_SECRET,
    JWT_EXPIRY
  );
  const refresh_token = await jwtService.generateToken(
    payload,
    REFRESH_SECRET,
    REFRESH_EXPIRY
  );

  //save refresh token in the database
  await authService.createRefreshToken(user.id, refresh_token);

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: false,
    maxAge: COOKIE_EXPIRY,
  });

  res.cookie("access_token", access_token, {
    httpOnly: false,
    secure: false,
    maxAge: COOKIE_EXPIRY,
  });

  res.status(200).json({
    status: true,
    message: "Logged in successfully!!!",
  });
});

const logout = asyncHandler(async (req, res, next) => {
  // console.log(req.cookies.refresh_token);
  const refreshToken = req.cookies.refresh_token;

  await authService.logout(refreshToken);

  //clear cookies from browser
  res.cookie("refresh_token", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
  });

  res.cookie("access_token", "", {
    httpOnly: false,
    secure: false,
    expires: new Date(0),
  });

  logger.info(
    `Username: ${req.user.firstName || "user"} logged out successfully`
  );

  return res.status(200).json({
    status: true,
    message: "Logged out successfully!!!",
  });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) {
      return next("Profile Pic is Required");
    }

    const photoUrl = req.file.path;
    const isProfileUpdated = await updateProfileById(req.user.id, photoUrl);
    if (!isProfileUpdated) {
      return next(new Error("Profile Picture is not Updated"));
    }
    res.status(201).json({
      success: true,
      message: "Profile Updated Successfull",
    });
  } catch (error) {
    logger.error(
      `{Api:${req.url}, Error:${error.message}, stack:${error.stack} }`
    );
  }
});

const getUserDetailsById = asyncHandler(async (req, res, next) => {
  const user_id = req?.user?.id;

  const result = await authService.getUserDetailsById(user_id);
  return res.status(200).json(result);
});

module.exports = { signup, login, logout, updateProfile, getUserDetailsById };
