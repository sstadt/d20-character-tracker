/**
 * Utility service for Game model
 */

var q = require('q');

module.exports = {
  validateConfig: function (game) {
    var defaultConfig = _.extend(sails.config.models.game.defaultConfig),
      deferred = q.defer(),
      settingUpdated = false;

    if (!game.config) {
      settingUpdated = true;
      game.config = {};
    }

    for (var setting in defaultConfig) {
      if (!game.config.hasOwnProperty(setting)) {
        settingUpdated = true;
        game.config[setting] = defaultConfig[setting];
      }
    }

    if (settingUpdated) {
      Game.update(game.id, game, function (err) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve();
        }
      });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  },
  getUserGames: function (userId) {
    var deferred = q.defer();

		Game.find({ gameMaster: userId })
			.populate('gameMaster')
			.populate('players')
			.exec(function (err, games) {
				if (err) {
          deferred.reject(err);
				} else {
          deferred.resolve(games);
				}
			});

    return deferred.promise;
  },
  getUserParticipatingGames: function (userId) {
    var deferred = q.defer();

    User.findOne(userId)
      .populate('player')
      .exec(function (err, user) {
        if (err) {
          deferred.reject(err);
        } else if (!user) {
          deferred.reject(ErrorService.generate('Player not found')); // TODO: this is going to break the jsonHandler response
        } else {
          gameIds = _.extend(user.player).map(function (game) {
            return game.id;
          });

          Game.find(gameIds)
            .populate('gameMaster')
            .populate('players')
            .exec(function (err, games) {
              if (err) {
                deferred.reject('Could not retrieve games');
              } else {
                deferred.resolve(games);
              }
            });
        }
      });

    return deferred.promise;
  },
  approvePlayer: function (gameId, userId) {
    var deferred = q.defer();

    Game.findOne(gameId, function (err, game) {
      if (err) {
        deferred.reject(ErrorService.parse(err));
      } else if (!game) {
        deferred.reject(ErrorService.generate('Game not found'));
      } else {
        User.findOne(userId, function (err, user) {
          if (err) {
            deferred.reject(ErrorService.parse(err));
          } else if (!user) {
            deferred.reject(ErrorService.generate('Player not found'));
          } else {
            game.requestingPlayers.remove(user.id);
            game.players.add(user.id);
            game.save(function (err) {
              if (err) {
                deferred.reject(ErrorService.parse(err));
              } else {
                Game.message(game.id, {
                  type: 'playerJoinApproved',
                  game: game.id,
                  data: { player: user }
                });

                Game.findOne(game.id)
                  .populate('gameMaster')
                  .populate('players')
                  .populate('requestingPlayers')
                  .exec(function (err, populatedGame) {
                    User.message(user.id, {
                      type: 'playerJoinApproved',
                      game: populatedGame
                    });
                  });

                deferred.resolve();
              }
            });
          }
        });
      }
    });

    return deferred.promise;
  }
};
