const africastalking = require("africastalking")

require("dotenv").config();

const at = africastalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

module.exports = at;
