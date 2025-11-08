require("dotenv").config();

const { PORT, NODE_ENV, DB, USER, PASSWORD, HOST, JWT_SECRET, JWT_EXPIRY } =
  process.env;

module.exports = {
  PORT,
  NODE_ENV,
  DB,
  USER,
  PASSWORD,
  HOST,
  JWT_SECRET,
  JWT_EXPIRY,
};
