const express = require('express');
// const sendSms = require('./smsSender');
const ussdHandler = require('./ussd-sms-backend/ussdHandler');
const smsHandler = require('./agribot/smsHandler');
const weather = require('./openweather/openweather');
const cors = require('cors');
const smsHandlerWeb = require('./agribot/utils/smsHandlerWeb');
const dotenv = require("dotenv").config()



//initialize port variable 
const PORT = process.env.PORT;

const app = express();


// Enable CORS for all routes
app.use(cors());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Incoming SMS webhook endpoint for Africa's Talking
app.post('/incoming-sms', smsHandler);

// Incoming SMS webhook endpoint for Africa's Talking
app.post('/incoming-sms-web', smsHandlerWeb);

//Endpoint for ussd 
app.post('/ussd', ussdHandler)

//Endpoint for weather
app.get('/weather', weather);



app.listen(PORT, (req, res) => {
  console.log(`SMS API server running at http://localhost:${PORT}`);
});
