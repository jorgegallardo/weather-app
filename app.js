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
  geocode.geocodeAddress(encodedAddress);
} else console.log('Missing address.');