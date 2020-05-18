const request = require('request');
const MAP_BOX_KEY = process.env.MAP_BOX_KEY;

const geocode = (address, callback) => {
  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${MAP_BOX_KEY}`;
  request({ url: mapBoxUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services');
    } else if (response.body.message || response.body.features.length === 0) {
      callback('Could not find that location');
    } else {
      const longitude = response.body.features[0].center[0];
      const latitude = response.body.features[0].center[1];
      const location = response.body.features[0].place_name;
      callback(undefined, {
        longitude: longitude,
        latitude: latitude,
        location: location
      });
    }
  });
};

module.exports = geocode;
