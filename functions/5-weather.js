require('dotenv').config();
const axios = require('axios');

const url = `http://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial&q=`;

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Invalid Method! Only Post Requests Allowed.',
    };
  }
  const { city } = JSON.parse(event.body);
  try {
    const res = await axios.get(`${url}${city}`);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 200,
      body: JSON.stringify(err),
    };
  }
};
