const req = require('request');

let weather = (address, callback) => {
  let url = 'http://api.weatherstack.com/current?access_key=5da7dbf764423927a54242574cf7a995&query=' + encodeURIComponent(address);
  req({url, json: true}, (reject, response) => {
    if (reject) {
      callback({error: 'Unable to connect to the Server'})
    } else if (!response.body.request) {
      callback({error: 'Invalid Data <br>Please Check The Name of The Address  '})
    } else {
      callback(undefined, {
        country: response.body.request.query,
        temperature: response.body.current.temperature,
        latitude: response.body.location.lat,
        longitude: response.body.location.lon,
      })
    }
  })
};


module.exports = weather;
