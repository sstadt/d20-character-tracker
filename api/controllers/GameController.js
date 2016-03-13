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
			} else {
				res.view({
					title: game.title,
					id: game.id,
					script: 'game'
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
	}

};
