const sendSms = require("./smsSender");

const ussdHandler = async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body || {};
  const textValue = (text || '').trim();
  const textParts = textValue === '' ? [] : textValue.split('*');

  let response = '';
  let msg = '';

  if (serviceCode === '*384*13202#') {
    switch (textParts.length) {
      case 0:
        response = `CON Welcome to AgriPest Assistant:\n1. Pest Issues\n2. Weather Insights\n3. Crop Advisory\n4. Recommendations\n5. Exit`;
        break;

      case 1:
        if (textParts[0] === '1') {
          response = `CON Select your crop:\n1. Maize\n2. Tomato\n3. Cassava`;
        } else if (textParts[0] === '2') {
          response = `CON Select your region:\n1. Dodoma\n2. Mbeya\n3. Kilimanjaro`;
        } else if (textParts[0] === '3') {
          response = `CON Select your crop:\n1. Maize\n2. Tomato\n3. Cassava`;
        } else if (textParts[0] === '4') {
          response = `CON What do you need recommendations on?\n1. Pest Control\n2. Soil Fertility\n3. Irrigation Tips`;
        } else {
          msg = `Thank you for using AgriPest Assistant.`;
          await sendSms(phoneNumber, msg);
          response = `END ${msg}`;
        }
        break;

      case 2:
        if (textParts[0] === '1') {
          response = `CON Select symptom:\n1. Holes in leaves\n2. Yellowing\n3. White powder on leaves`;
        } else if (textParts[0] === '2') {
          msg = `Weather: Sunny ☀️, Rainfall: Light 🌧️, Pest Risk: Low`;
          await sendSms(phoneNumber, msg);
          response = `END ${msg}`;
        } else if (textParts[0] === '3') {
          msg = `Use compost, weed weekly, harvest early morning. 🌾`;
          await sendSms(phoneNumber, msg);
          response = `END Crop Advice: ${msg}`;
        } else if (textParts[0] === '4') {
          msg = `Use neem-based spray weekly for pest control. 🐛`;
          await sendSms(phoneNumber, msg);
          response = `END Advice: ${msg}`;
        }
        break;

      case 3:
        if (textParts[0] === '1') {
          msg = `Possible Pest: Fall Armyworm 🐛\nRecommendation: Use pheromone traps & neem spray.`;
          await sendSms(phoneNumber, msg);
          response = `END ${msg}`;
        }
        break;

      default:
        response = `END Invalid input. Please try again.`;
    }
  } else {
    response = `END Invalid USSD code.`;
  }

  res.set('Content-Type', 'text/plain');
  res.send(response);
};

module.exports = ussdHandler;
