const express = require("express");
const { PORT } = require("./utils/constant"); // make sure PORT is defined in constant.js
const { PATH } = require("./utils/path");
const { authRoute, messageRoute } = require("./routes");
const errorHandler = require("./utils/erroMiddleware");
const logger = require("./utils/winstonLoggerConfig");
require("colors");

require("./config/db");
require("./Model/sync");
const app = express();

//middleware
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server Running at http://localhost:${PORT}`.bgBlue);
});
