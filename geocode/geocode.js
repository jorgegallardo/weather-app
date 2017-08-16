const request = require('request');

var geocodeAddress = (address) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      console.log('Unable to connect to Google servers.');
    } else if(body.status === 'INVALID_REQUEST' || body.status === 'ZERO_RESULTS') {
      console.log('Unable to find address.');
    } else if(body.status === 'OK') {
      //console.log(JSON.stringify(body, undefined, 2)); //pretty print
      console.log(`Address: ${body.results[0].formatted_address}\nLatitude: ${body.results[0].geometry.location.lat}.\nLongitude: ${body.results[0].geometry.location.lng}`);
    }
  });
};

module.exports = {
  geocodeAddress
};