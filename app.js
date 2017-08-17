const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

if(encodedAddress.length !== 0) {
  geocode.geocodeAddress(encodedAddress, (errorMessage, locationResults) => {
    if(errorMessage) {
      console.log(errorMessage);
    } else {
      //console.log(JSON.stringify(locationResults, undefined, 2));
      var lat = locationResults.latitude;
      var lng = locationResults.longitude;

      weather.getWeather(lat, lng, (errorMessage, weatherResults) => {
        if(errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(`It is currently ${weatherResults.temperature} degrees in ${locationResults.address}.`);
        }
      });
    }
  });
} else {
  console.log('Missing address.');
}