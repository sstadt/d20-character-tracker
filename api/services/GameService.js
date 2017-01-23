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

  subscribe: function (req, game) {
    var userId = req.session.User.id;

    Game.subscribe(req.socket, game.id);

    if (!_.isArray(game.online)) {
      game.online = [];
    }

    if (game.online.indexOf(userId) === -1) {
      game.online.push(userId);
      game.save(function (err) {
        if (err) {
          sails.error(err);
        } else {
          Game.message(game.id, {
            type: 'playerOnline',
            game: game.id,
            data: { player: req.session.User.id }
          });
        }
      });
    }
  },

  unsubscribe: function (session, gameId) {
    var deferred = q.defer();

    Game.findOne(gameId, function (err, game) {
      if (err) {
        sails.error(err);
        deferred.reject(err);
      } else if (game === undefined) {
        // there is no game to unsubscribe from,
        // but there was also no error
        deferred.resolve();
      } else {
        game.online.splice(game.online.indexOf(session.User.id), 1);
        game.save(function (err) {
          if (err) {
            sails.error(err);
            deferred.reject(err);
          } else {
            Game.message(game.id, {
              type: 'playerOffline',
              game: game.id,
              data: { player: session.User.id }
            });

            deferred.resolve();
          }
        });
      }
    });

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
          deferred.reject(ErrorService.parse(err));
        } else if (!user) {
          deferred.reject(ErrorService.generate('Player not found'));
        } else {
          gameIds = _.extend(user.player).map(function (game) {
            return game.id;
          });

          Game.find(gameIds)
            .populate('gameMaster')
            .populate('players')
            .exec(function (err, games) {
              if (err) {
                deferred.reject(ErrorService.parse(err));
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
        UserService.fetchPublicUser(userId, function (err, user) {
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
                      data: { game: populatedGame }
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
  },

  declinePlayer: function (gameId, playerId) {
    var deferred = q.defer();

    Game.findOne(gameId, function (err, game) {
      if (err) {
        deferred.reject(ErrorService.parse(err));
      } else if (!game) {
        deferred.reject(ErrorService.generate('Game not found'));
      } else {
        UserService.fetchPublicUser(playerId, function (err, user) {
          if (err) {
            deferred.reject(ErrorService.parse(err));
          } else if (!user) {
            deferred.reject('Player not found');
          } else {
            game.requestingPlayers.remove(user.id);
            game.save(function (err) {
              if (err) {
                deferred.reject(err);
              } else {
    						Game.message(game.id, {
    							type: 'playerJoinDeclined',
    							game: game.id,
    							data: { player: user }
    						});

    						User.message(user.id, {
    							type: 'playerJoinDeclined',
    							data: { game: game }
    						});

                deferred.resolve();
              }
            });
          }
        });
      }
    });

    return deferred.promise;
  },

  removePlayer: function (gameId, playerId) {
    var deferred = q.defer();

		Game.findOne(gameId, function (err, game) {
			if (err) {
				deferred.reject(ErrorService.parse(err));
      } else if (!game) {
        deferred.reject(ErrorService.generate('Game not found'));
			} else {
        UserService.fetchPublicUser(playerId, function (err, user) {
          if (err) {
            deferred.reject(ErrorService.parse(err));
          } else if (!user) {
            deferred.reject(ErrorService.generate('Player not found'));
          } else {
            game.players.remove(user.id);
    				game.save(function (err) {
    					if (err) {
    						deferred.reject(ErrorService.parse(err));
    					} else {
    						Game.message(game.id, {
    							type: 'playerRemoved',
    							game: game.id,
    							data: { player: user }
    						});

    						User.message(user.id, {
    							type: 'removedFromGame',
    							data: { game: game }
    						});

    						deferred.resolve();
    					}
    				});
          }
        });
			}
		});

    return deferred.promise;
  },

  updateDestinyPool: function (gameId, light, dark) {
    var deferred = q.defer();

    Game.update(gameId, { lightTokens: light, darkTokens: dark }, function (err) {
      if (err) {
        deferred.reject(err);
      } else {
        Game.message(gameId, {
          type: 'destinyPoolUpdated',
          data: {
            light: light,
            dark: dark
          }
        });

        deferred.resolve();
      }
    });

    return deferred.promise;
  },

  rollDestinyPool: function (gameId, chatHandle, numPlayers) {
    var deferred = q.defer(),
      description = 'has rolled the destiny pool',
      dicePool = { force: numPlayers };

		if (!DicePoolService.isValidTaskRoll(dicePool)) {
			deferred.reject('Invalid dice pool');
		} else {
			GameLogService.addRollMessage(gameId, chatHandle, description, dicePool)
				.then(function success(rollMessage) {
					deferred.resolve(rollMessage);
				}, function error(err) {
					deferred.reject(err);
				});
		}

    return deferred.promise;
  },

  comsumeDestinyToken: function (gameId, type) {
    var deferred = q.defer(),
      updated = false;

    if (type !== 'light' && type !== 'dark') {
      deferred.reject('Invalid token type');
    } else {
      Game.findOne(gameId, function (err, game) {
        if (err || _.isUndefined(game)) {
          deferred.reject(err || 'Invalid game');
        } else {
          if (type === 'light' && game.lightTokens > 0) {
            game.lightTokens--;
            game.darkTokens++;
            updated = true;
          } else if (type === 'dark' && game.darkTokens > 0) {
            game.darkTokens--;
            game.lightTokens++;
            updated = true;
          }

          if (updated) {
            game.save(function (err) {
              if (err) {
                deferred.reject(err);
              } else {
                Game.message(gameId, {
                  type: 'destinyPoolUpdated',
                  data: {
                    light: game.lightTokens,
                    dark: game.darkTokens
                  }
                });

                deferred.resolve();
              }
            });
          } else {
            deferred.resolve();
          }
        }
      });
    }

    return deferred.promise;
  }

};
