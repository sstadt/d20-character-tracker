
var constants = require('../config/constants.js');

module.exports = {
  getMyGames: function () {
    var deferred = q.defer();

    io.socket.get(constants.endpoints.game.playing, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('There was an error retrieving your games');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  get: function (id) {
    var deferred = q.defer();

    io.socket.get(constants.endpoints.game.get, { gameId: id, id: id }, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('The requested game could not be found');
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
        console.error(response.err);
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
        console.error(response.err);
        deferred.reject('There was an error creating the game');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  updateConfig: function (id, config) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.updateConfig, { gameId: id, id: id, config: config }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('There was an error updating the game config');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  addCrawl: function (crawl) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.addCrawl, { gameId: crawl.game, crawl: crawl }, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('There was an error adding the crawl');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  updateCrawl: function (crawl) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.updateCrawl, { gameId: grawl.game, crawl: crawl }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('There was an error saving the crawl ' + crawl.title);
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  deleteCrawl: function (crawl) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.removeCrawl, { gameId: crawl.game, crawl: crawl }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('There was an error deleting the crawl');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  join: function (game) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.join, { game: game.id }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('Could not join game at this time.');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  approvePlayer: function (game, player) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.approvePlayer, { gameId: game.id, player: player.id }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('Could not approve player at this time.');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  removePlayer: function (game, player) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.game.removePlayer, { gameId: game.id, player: player.id }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('Could not remove player at this time');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};
