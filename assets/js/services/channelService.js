
var q = require('q');

var io = require('../config/io.js');
var constants = require('../config/constants.js');

module.exports = {
  join: function (channelName) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.channel.join, { name: channelName }, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('There was an error joining that channel');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  leave: function (channelId) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.channel.leave, { channel: channelId }, function (err) {
      if (err) {
        console.error(err);
        deferred.reject('There was an error leaving the channel');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};
