
var q = require('q');

var io = require('../config/io.js');
var constants = require('../config/constants.js');

module.exports = {
  getMyGames: function () {
    var deferred = q.defer();

    io.socket.get(constants.endpoints.game.ownedIndex, function (response) {
      if (response.err) {
        console.error(response);
        deferred.reject('There was an error retrieving your games');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  search: function (filter) {
    var deferred = q.defer();

    io.socket.get(constants.endpoints.game.search, { filter: filter }, function (response) {
      if (response.err) {
        console.error(response);
        deferred.reject('There was an error looking for games');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  create: function (title) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.create, { title: title }, function (response) {
      if (response.err) {
        console.error(response);
        deferred.reject('There was an error creating the game');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  }
};
