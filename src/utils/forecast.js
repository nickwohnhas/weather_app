const request = require('request');
const DARK_SKY_KEY = process.env.DARK_SKY_KEY;

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (response.body.error) {
      callback('Unable to find location');
    } else {
      const { temperature, precipProbability } = response.body.currently;
      const { summary, temperatureHigh, temperatureLow } = response.body.daily.data[0]
      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. The high for the day will be ${temperatureHigh} and the low will be ${temperatureLow}.`
      );
    }
  });
};

module.exports = forecast;
