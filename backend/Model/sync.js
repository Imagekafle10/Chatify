const logger = require("../utils/winstonLoggerConfig");

const sequelize = require("../config/db.js");
const User = require("../Model/User");
const Message = require("../Model/Message.js");

(async () => {
  try {
    await sequelize.sync({ alter: false }); //
    logger.info(" All tables synced successfully!");
  } catch (err) {
    logger.error(" Error syncing tables:", err);
  }
})();
