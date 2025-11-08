const express = require("express");
const { PORT } = require("./utils/constant"); // make sure PORT is defined in constant.js
const { PATH } = require("./utils/path");
const { authRoute, messageRoute } = require("./routes");
require("colors");

const app = express();

app.use(PATH.AUTH, authRoute);
app.use(PATH.MESSAGE, messageRoute);

// // Middleware to parse JSON
// app.use(express.json());

// Start server
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`.bgGreen);
});
