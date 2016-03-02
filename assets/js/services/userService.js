
var q = require('Q');

var io = require('../config/io.js');
var constants = require('../config/constants.js');

module.exports = {
  setChatHandle: function (newHandle) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.user.setHandle, { handle: newHandle }, function (err) {
      if (err) {
        console.error(err);
        deferred.reject('There was an error setting your chat handle');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};
