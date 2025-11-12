const { jwtService } = require("..");
const RefreshToken = require("../../Model/RefreshToken");
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

const createRefreshToken = async (id, refresh_token) => {
  await RefreshToken.create({ user_id: id, token: refresh_token });
  return refresh_token;
};

const verifyCaptchaResponse = async (captchaResponse) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET_KEY}&response=${captchaResponse}`;
  if (CAPTCHA == "true") {
    const response = await axios.post(url);
    return response.data.success;
  }
  return true;
};

const logout = async (refresh_token) => {
  const result = await RefreshToken.destroy({
    where: { token: refresh_token },
  });
  return result;
};

const refresh = async (refresh_token) => {
  const token = await RefreshToken.findOne({ where: { token: refresh_token } });
  if (token == null) return CustomErrorHandler.unAuthorized();

  //verify the refresh token
  const { user_id, username, email } = jwtService.verify(
    refresh_token,
    REFRESH_SECRET
  );

  //check if user exists
  const user = await User.findOne({ where: { id: user_id } });
  if (user == null) return CustomErrorHandler.unAuthorized("No user found");

  //generate new tokens
  let payload = { user_id, username, email };
  let new_access_token = jwtService.generateToken(
    payload,
    JWT_SECRET,
    JWT_EXPIRY
  );
  let new_refresh_token = jwtService.generateToken(
    payload,
    REFRESH_SECRET,
    REFRESH_EXPIRY
  );

  await RefreshToken.update(
    { token: new_refresh_token },
    {
      where: {
        [Op.and]: [{ token: refresh_token }, { user_id: user_id }],
      },
    }
  );

  return { access_token: new_access_token, refresh_token: new_refresh_token };
};

module.exports = {
  findUserByEmail,
  createUser,
  createRefreshToken,
  verifyCaptchaResponse,
  logout,
  refresh,
};
