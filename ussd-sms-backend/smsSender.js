const at = require("../africastalking");

const sms = at.SMS;

const sendSms = async (to, message) => {
  try {
    const response = await sms.send({
      to,
      message,
      from: 'AgriSmart'
    });
    console.log('✅ SMS sent:', response);
  } catch (error) {
    console.error('❌ Failed to send SMS:', error);
  }
};

module.exports = sendSms;