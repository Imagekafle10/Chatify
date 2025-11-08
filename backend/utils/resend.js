const { Resend } = require("resend");
const { EMAIL_FROM, EMAIL_NAME, RESEND_EMAIL } = require("./constant");

const resendClient = new Resend(RESEND_EMAIL);

const sender = {
  email: EMAIL_FROM,
  name: EMAIL_NAME,
};

module.exports = { resendClient, sender };
