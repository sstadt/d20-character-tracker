
var config = require('../lib/config.js');

module.exports = {
  getMyGames: function () {
    var deferred = q.defer();

    io.socket.get(config.endpoints.game.playing, function (response) {
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

    io.socket.get(config.endpoints.game.get, {
      gameId: id
    }, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('The requested game could not be found');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  getLog: function (id) {
    var deferred = q.defer();

    io.socket.get(config.endpoints.game.getLog, {
      gameId: id
    }, function (response) {
      if (!response || response.err) {
        console.error(response.err);
        deferred.reject('There was an error retriving the game log');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  search: function (filter) {
    var deferred = q.defer();

    io.socket.get(config.endpoints.game.search, {
      filter: filter
    }, function (response) {
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

    io.socket.post(config.endpoints.game.create, {
      title: title
    }, function (response) {
      if (response.err) {
        console.error(response.err);
        deferred.reject('There was an error creating the game');
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  updateConfig: function (id, updatedConfig) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.game.updateConfig, {
      gameId: id,
      config: updatedConfig
    }, function (response) {
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

    io.socket.post(config.endpoints.game.addCrawl, {
      gameId: crawl.game,
      crawl: crawl
    }, function (response) {
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

    io.socket.post(config.endpoints.game.updateCrawl, {
      gameId: crawl.game,
      crawl: crawl
    }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('There was an error saving the crawl ' + crawl.title);
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  deleteCrawl: function (game, crawlId) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.game.removeCrawl, {
      gameId: game,
      crawl: crawlId
    }, function (response) {
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

    io.socket.post(config.endpoints.game.join, {
      game: game.id
    }, function (response) {
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

    io.socket.post(config.endpoints.game.approvePlayer, {
      gameId: game.id,
      player: player.id
    }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('Could not approve player at this time.');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  declinePlayer: function (game, player) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.game.declinePlayer, {
      gameId: game.id,
      player: player.id
    }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('Could not decline player at this time');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  removePlayer: function (game, player) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.game.removePlayer, {
      gameId: game.id,
      player: player.id
    }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('Could not remove player at this time');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  sendMessage: function (gameId, message) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.game.sendMessage, {
      gameId: gameId,
      message: message
    }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('Could not send chat message at this time');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  sendRoll: function (game, description, dicePool) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.game.sendRoll, {
      gameId: game.id,
      dicePool: dicePool,
      description: description
    }, function (response) {
      if (response && response.err) {
        console.error(response.err);
        deferred.reject('Could not send dice roll at this time');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};
