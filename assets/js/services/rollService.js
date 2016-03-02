
var q = require('Q');

var io = require('../config/io.js');
var constants = require('../config/constants.js');

module.exports = {
  roll: function (roll) {
    var deferred = q.defer();

    io.socket.get(constants.endpoints.dice.roll, roll, function (response) {
      if (response.err) {
        deferred.reject('There was an error rolling.');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  }
};
