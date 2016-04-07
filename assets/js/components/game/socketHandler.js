
function getPlayerIndex(list, id) {
  return _.findIndex(list, function (player) {
    return player.id === id;
  });
}

function getCrawlIndex(list, id) {
  return _.findIndex(list, function (crawl) {
    return id === crawl.id;
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
      var playerIndex = getPlayerIndex(game.requestingPlayers, data.player.id);

      if (playerIndex > -1) {
        game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
      }

      game.players.push(data.player);
    },
    playerJoinDeclined: function (game, data) {
      var playerIndex = getPlayerIndex(game.requestingPlayers, data.player.id);

      if (playerIndex > -1) {
        game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
      }
    },
    playerRemoved: function (game, data, user) {
      var playerIndex = getPlayerIndex(game.players, data.player.id);

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
        var crawlIndex = getCrawlIndex(game.crawls, data.crawl.id);

        if (crawlIndex > -1) {
          game.crawls.$set(crawlIndex, _.extend(data.crawl));
        }
      }
    },
    gameCrawlDestroyed: function (game, data) {
      if (_.isObject(data.crawl)) {
        var crawlIndex = getCrawlIndex(game.crawls, data.crawl.id);

        if (crawlIndex > -1) {
          game.crawls.$remove(game.crawls[crawlIndex]);
        }
      }
    },
  }
};
