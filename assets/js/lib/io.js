

define([
  'socket.io',
  'sails.io'
], function(socketIOClient, sailsIOClient)  {
  if (typeof location.origin === 'undefined') {
    location.origin = location.protocol + '//' + location.host;
  }

  io = sailsIOClient(socketIOClient);

  // mute console.logs during unit testing
  if (/PhantomJS/.test(window.navigator.appVersion)) {
    io.sails.environment = 'production';
  }

  io.sails.url = location.origin;

  return io;
});

