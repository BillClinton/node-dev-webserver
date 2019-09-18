const request = require('request');
const config = require('../config');

const forecast = ({ long, lat }, callback) => {
  const apiKey = config.weatherApiKey;
  const url = `https://api.darksky.net/forecast/${apiKey}/${long},${lat}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to retieve weather information');
    } else {
      const c = body.currently;
      const d = body.daily;
      const msg = `${d.data[0].summary}  It is currently ${c.temperature} degrees. There is a ${c.precipProbability}% chance of rain.`;
      callback(undefined, { msg });
    }
  });
};

module.exports = forecast;
