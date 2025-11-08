const { resendClient, sender } = require("../utils/resend");
const logger = require("../utils/winstonLoggerConfig");
const { createWelcomeEmailTemplate } = require("./emailTemplates");

const sendWelcomeEmail = async (email, name, clientUrl) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome To Chatify",
    html: createWelcomeEmailTemplate(name, clientUrl),
  });

  if (error) {
    logger.error("Falied To Send Email");
    console.log(error);
  }

  //   console.log("Welcome Email Send SuccessFully", data);
};

module.exports = { sendWelcomeEmail };
