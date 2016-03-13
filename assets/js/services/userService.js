
var q = require('q');

var io = require('../config/io.js');
var constants = require('../config/constants.js');

var user;

module.exports = {
  getUserInfo: function () {
    var deferred = q.defer();

    if (user) {
      deferred.resolve(user);
    } else {
      io.socket.get(constants.endpoints.user.getSelf, function (data) {
        if (data.err) {
          console.error(err);
          deferred.reject('there was an error retrieving your user data');
        } else {
          user = data;
          deferred.resolve(user);
        }
      });
    }

    return deferred.promise;
  },
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
