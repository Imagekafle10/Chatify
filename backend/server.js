const express = require("express");
const { PORT, REACT_APP_URL } = require("./utils/constant"); // make sure PORT is defined in constant.js
const { PATH } = require("./utils/path");
const cors = require("cors");
const { authRoute, messageRoute } = require("./routes");
const errorHandler = require("./utils/erroMiddleware");
const logger = require("./utils/winstonLoggerConfig");
const cookieParser = require("cookie-parser");
require("colors");

require("./config/db");
require("./Model/sync");
const app = express();

const corsOptions = {
  origin: REACT_APP_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

//middleware
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server Running at http://localhost:${PORT}`.bgBlue);
});
