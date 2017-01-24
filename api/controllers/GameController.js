/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var q = require('q');

module.exports = {

	browser: function (req, res) {
		res.view({
			script: 'browser'
		});
	},

	show: function (req, res) {
		Game.findOne(req.param('gameId'), function (err, game) {
			if (err) {
				res.serverError(err);
			} else if (!game) {
				res.serverError('Game not found');
			} else {
				GameService.validateConfig(game)
					.then(function success() {
						res.view({
							title: game.title,
							id: game.id,
							script: 'game'
						});
					}, function error(err) {
						res.serverError(err);
					});
			}
		});
	},

	/*
	 * API
	 */

	get: function (req, res) {
		Game.findOne(req.param('gameId'))
			.populate('gameMaster')
			.populate('players')
			.populate('requestingPlayers')
			.populate('crawls')
			.exec(function (err, game) {
				if (err) {
					res.jsonError(err);
				} else {
					GameService.subscribe(req, game);
					res.json(game);
				}
			});
	},

	playing: function (req, res) {
		var myGames;

		GameService.getUserGames(req.session.User.id)
			.then(function succes(games) {
				myGames = games;
			}, function error(err) {
				return q.reject(err);
			})
			.then(function success() {
				return GameService.getUserParticipatingGames(req.session.User.id);
			}, function error(err) {
				return q.reject(err);
			})
			.then(function success(games) {
				var combinedGames = myGames.concat(games);
				res.json(combinedGames);
			}, function error(err) {
				res.json(err);
			});
	},

	search: function (req, res) {
		var searchParams = {
      title: { contains: req.param('filter') }
    };

		Game.find(searchParams)
			.populate('gameMaster')
			.populate('players')
			.populate('requestingPlayers')
			.exec(function (err, games) {
				if (err) {
					res.jsonError(err);
				} else {
					var publicGames = _.filter(games, function (game) {
						return game.config && game.config.isPublic === true;
					});

					res.json(publicGames);
				}
			});
	},

	create: function (req, res) {
		Game.create({
			title: req.param('title'),
			gameMaster: req.session.User.id
		}, function (err, game) {
			if (err) {
				res.jsonError(err);
			} else {
				Game.findOne(game.id)
					.populate('gameMaster')
					.populate('players')
					.exec(function (err, game) {
						if (err) {
							res.jsonError(err);
						} else {
							res.json(game);
						}
					});
			}
		});
	},

	updateConfig: function (req, res) {
		Game.update(req.param('gameId'), { config: req.param('config') }, function (err, game) {
			if (err) {
				res.jsonError(err);
			} else {
				res.send(200);
			}
		});
	},

	addCrawl: function (req, res) {
		var gameId = req.param('gameId');

		Crawl.create(req.param('crawl'), function (err, crawl) {
			if (err) {
				res.jsonError(err);
			} else {
				Game.message(gameId, {
					type: 'gameCrawlAdded',
					game: gameId,
					data: { crawl: crawl }
				});

				res.json(crawl);
			}
		});
	},

	join: function (req, res) {
		Game.findOne(req.param('game'))
			.populate('requestingPlayers')
			.exec(function (err, game) {
				if (err) {
					res.jsonError(err);
				} else if (!game) {
					res.json(ErrorService.generate('Game not found'));
				} else {
					game.requestingPlayers.add(req.session.User.id);
					game.save(function (err) {
						if (err) {
							res.jsonError(err);
						} else {
							Game.message(game.id, {
								type: 'playerRequestedJoin',
								game: game.id,
								data: { player: req.session.User }
							});
							res.send(200);
						}
					});
				}
			});
	},

	approvePlayer: function (req, res) {
		var userId = req.param('player'),
			gameId = req.param('gameId');

		GameService.approvePlayer(gameId, userId)
			.then(function success() {
				res.send(200);
			}, function error(err) {
				res.json(err);
			});
	},

	declinePlayer: function (req, res) {
		var userId = req.param('player'),
			gameId = req.param('gameId');

		GameService.declinePlayer(gameId, userId)
			.then(function success() {
				res.send(200);
			}, function error(err) {
				res.json(err);
			});
	},

	removePlayer: function (req, res) {
		var userId = req.param('player'),
			gameId = req.param('gameId');

		GameService.removePlayer(gameId, userId)
			.then(function success() {
				res.send(200);
			}, function error(err) {
				res.json(err);
			});
	},

	rollDestinyPool: function (req, res) {
		var gameId = req.param('gameId'),
			chatHandle = req.session.User.chatHandle,
			numPlayers = req.param('numPlayers');

		if (numPlayers > 0) {
			GameService.rollDestinyPool(gameId, chatHandle, numPlayers)
				.then(function success(rollMessage) {
					var lightTokens = rollMessage.message.overallResults.light,
					darkTokens = rollMessage.message.overallResults.dark;

					return GameService.updateDestinyPool(gameId, lightTokens, darkTokens);
				})
				.then(function success() {
					res.send(200);
				}, function (err) {
					res.jsonError(err);
				});
		} else {
			res.jsonError('Cannot roll destiny pool without players.');
		}
	}

};
