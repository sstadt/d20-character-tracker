/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	browser: function (req, res) {
		res.view({
			script: 'browser'
		});
	},

	show: function (req, res) {
		Game.findOne(req.param('id'), function (err, game) {
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
		Game.findOne(req.param('id'))
			.populate('gameMaster')
			.populate('players')
			.populate('crawls')
			.exec(function (err, game) {
				if (err) {
					res.jsonError(err);
				} else {
					res.json(game);
				}
			});
	},

	owned: function (req, res) {
		Game.find({ gameMaster: req.session.User.id })
			.populate('gameMaster')
			.populate('players')
			.exec(function (err, games) {
				if (err) {
					res.jsonError(err);
				} else {
					res.json(games);
				}
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
					res.json(games);
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
		Game.update(req.param('id'), { config: req.param('config') }, function (err, game) {
			if (err) {
				res.jsonError(err);
			} else {
				res.send(200);
			}
		});
	},

	addCrawl: function (req, res) {
		Crawl.create(req.param('crawl'), function (err, crawl) {
			if (err) {
				res.jsonError(err);
			} else {
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
					console.log(game);

					game.save(function (err) {
						if (err) {
							res.jsonError(err);
						} else {
							console.log('join successful');
							res.send(200);
						}
					});
				}
			});
	}

};
