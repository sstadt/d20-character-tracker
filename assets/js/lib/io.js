

define([
  'socket.io',
  'sails.io'
], function(socketIOClient, sailsIOClient)  {
  if (typeof location.origin === 'undefined') {
    location.origin = location.protocol + '//' + location.host;
  }

  io = sailsIOClient(socketIOClient);
  io.sails.url = location.origin;

  return io;
});

