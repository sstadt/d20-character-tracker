
function getIndexById(list, id) {
  return _.findIndex(list, function (item) {
    return item.id === id;
  });
}

module.exports = {
  isValidMessage: function (message, gameId) {
    return message.data.game && message.data.type && message.data.data && message.data.game === gameId;
  },
  player: {
    playerRequestedJoin: function (game, data) {
      game.requestingPlayers.push(data.player);
    },
    playerJoinApproved: function (game, data) {
      var playerIndex = getIndexById(game.requestingPlayers, data.player.id);

      if (playerIndex > -1) {
        game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
      }

      game.players.push(data.player);
    },
    playerJoinDeclined: function (game, data) {
      var playerIndex = getIndexById(game.requestingPlayers, data.player.id);

      if (playerIndex > -1) {
        game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
      }
    },
    playerRemoved: function (game, data, user) {
      var playerIndex = getIndexById(game.players, data.player.id);

      if (playerIndex > -1) {
        game.players.$remove(game.players[playerIndex]);
      }

      if (data.player.id === user.id) {
        window.location.href = '/home';
      }
    }
  },
  game: {
    gameCrawlAdded: function (game, data) {
      var crawl = data.crawl;

      if (_.isObject(crawl)) {
        game.crawls.push(crawl);
      }
    },
    gameCrawlUpdated: function (game, data) {
      if (_.isObject(data.crawl)) {
        var crawlIndex = getIndexById(game.crawls, data.crawl.id);

        if (crawlIndex > -1) {
          game.crawls.$set(crawlIndex, _.extend(data.crawl));
        }
      }
    },
    gameCrawlDestroyed: function (game, data) {
      if (_.isObject(data.crawl)) {
        var crawlIndex = getIndexById(game.crawls, data.crawl.id);

        if (crawlIndex > -1) {
          game.crawls.$remove(game.crawls[crawlIndex]);
        }
      }
    }
  },
  gameLog: {
    newLogMessage: function (gameLog, data) {
      gameLog.log.push(data);
    }
  }
};
