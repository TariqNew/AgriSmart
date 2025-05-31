const dns = require("dns");

function isOnline() {
  return new Promise((resolve) => {
    dns.lookup("openai.com", (err) => {
      resolve(!err);
    });
  });
}

module.exports = { isOnline };
