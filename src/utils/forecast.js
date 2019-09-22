const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/af4a42007bec70ee691ad6fa857ac24e/${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const { currently, daily} = body;
      callback(undefined, `${currently.summary}. It is currently ${currently.temperature} degrees out. This high today is ${daily.data[0].temperatureHigh} with a low of ${daily.data[0].temperatureLow}. There is a ${currently.precipProbability}% chance of rain.`);
    }
  });
};

module.exports = forecast;
