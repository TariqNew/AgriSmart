const AfricasTalking = require("africastalking");
const dotenv = require("dotenv").config()

const africasTalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = africasTalking.SMS;

module.exports = sms;