const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address whose weather you are attempting to check.',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.a);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  //console.log(JSON.stringify(body, undefined, 2)); //pretty print
  console.log(`Address: ${body.results[0].formatted_address}\nLatitude: ${body.results[0].geometry.location.lat}.\nLongitude: ${body.results[0].geometry.location.lng}`);
});