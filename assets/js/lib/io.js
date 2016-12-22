var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

if (typeof location.origin === 'undefined') {
  location.origin = location.protocol + '//' + location.host;
}

io = sailsIOClient(socketIOClient);

// mute console.logs during unit testing
if (/PhantomJS/.test(window.navigator.appVersion)) {
  io.sails.environment = 'production';
}

io.sails.url = location.origin;

module.exports = io;
