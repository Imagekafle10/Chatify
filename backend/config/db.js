require("colors");
const { Sequelize, DataTypes, Model } = require("sequelize");
const { DB, USER, PASSWORD, HOST } = require("../utils/constant");
const logger = require("../utils/winstonLoggerConfig");

// Create a Sequelize instance
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    logger.info(" Connection has been established successfully.".bgGreen);
  } catch (error) {
    logger.error(" Unable to connect to the database:".bgRed, error);
  }
})();

// sequelize.sync({ force: true });

// Export the connection for use in models
module.exports = sequelize;
