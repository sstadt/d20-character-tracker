
function getIndexById(list, id) {
  return _.findIndex(list, function (item) {
    return item.id === id;
  });
}

module.exports = {
  isValidMessage(message, gameId) {
    return message.data.game && message.data.type && message.data.data && message.data.game === gameId;
  },
  player: {
    playerRequestedJoin(game, data) {
      game.requestingPlayers.push(data.player);
    },
    playerJoinApproved(game, data) {
      var playerIndex = getIndexById(game.requestingPlayers, data.player.id);

      if (playerIndex > -1) {
        game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
      }

      game.players.push(data.player);
    },
    playerJoinDeclined(game, data) {
      var playerIndex = getIndexById(game.requestingPlayers, data.player.id);

      if (playerIndex > -1) {
        game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
      }
    },
    playerRemoved(game, data, user) {
      var playerIndex = getIndexById(game.players, data.player.id);

      if (playerIndex > -1) {
        game.players.$remove(game.players[playerIndex]);
      }

      if (data.player.id === user.id) {
        window.location.href = '/home';
      }
    },
    playerOnline(game, data) {
      if (game.online.indexOf(data.player) === -1) {
        game.online.push(data.player);
      }
    },
    playerOffline(game, data) {
      var index = game.online.indexOf(data.player);

      if (index > -1) {
        game.online.$remove(game.online[index]);
      }
    }
  },
  game: {
    gameCrawlAdded(game, data) {
      var crawl = data.crawl;

      if (_.isObject(crawl)) {
        game.crawls.push(crawl);
      }
    },
    gameCrawlUpdated(game, data) {
      if (_.isObject(data.crawl)) {
        var crawlIndex = getIndexById(game.crawls, data.crawl.id);

        if (crawlIndex > -1) {
          game.crawls.$set(crawlIndex, _.extend(data.crawl));
        }
      }
    },
    gameCrawlDestroyed(game, data) {
      if (_.isObject(data.crawl)) {
        var crawlIndex = getIndexById(game.crawls, data.crawl.id);

        if (crawlIndex > -1) {
          game.crawls.$remove(game.crawls[crawlIndex]);
        }
      }
    }
  },
  gameLog: {
    newLogMessage(gameLog, data) {
      gameLog.log.push(data);
    }
  }
};
