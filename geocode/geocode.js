const request = require('request');

var geocodeAddress = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to Google servers.');
    } else if(body.status === 'INVALID_REQUEST' || body.status === 'ZERO_RESULTS') {
      callback('Unable to find address.');
    } else if(body.status === 'OK') {
      //console.log(JSON.stringify(body, undefined, 2)); //pretty print
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};