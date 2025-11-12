const logger = require("../utils/winstonLoggerConfig");

const sequelize = require("../config/db.js");
const User = require("../Model/User");

(async () => {
  try {
    await sequelize.sync({ alter: false }); // drops tables and recreates
    logger.info(" All tables synced successfully!");
  } catch (err) {
    logger.error(" Error syncing tables:", err);
  }
})();
