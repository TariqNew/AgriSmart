const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const weather = async (req, res) => {
  const city = req.query.city;  
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found in environment variables.' });
  }

  if (!city) {
    return res.status(400).json({ error: 'City query parameter is required.' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const { name, main, weather } = response.data;

    res.json({
      city: name,
      temperature: main.temp,
      description: weather[0].description,
      icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
    });
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: 'Unable to fetch weather data',
      details: error.response?.data?.message || error.message,
    });
  }
};

module.exports = weather;
