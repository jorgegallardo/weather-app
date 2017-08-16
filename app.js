const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
  geocode.geocodeAddress(encodedAddress, (errorMessage, results) => {
    if(errorMessage) console.log(errorMessage);
    else console.log(JSON.stringify(results, undefined, 2));
  });
} else console.log('Missing address.');