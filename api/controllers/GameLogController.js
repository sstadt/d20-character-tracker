/**
 * GameLogController
 *
 * @description :: Server-side logic for managing Gamelogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var q = require('q');

module.exports = {

	get: function (req, res) {
		GameLogService.getLog(req.param('gameId'))
			.then(function success(log) {
				res.json(log);
			}, function error(err) {
				res.jsonError(err);
			});
	},

	addMessage: function (req, res) {
		var gameId = req.param('gameId'),
			chatHandle = req.session.User.chatHandle,
			message = req.param('message');

		GameLogService.addChatMessage(gameId, chatHandle, message)
			.then(function success() {
				res.send(200);
			}, function error(err) {
				res.jsonError(err);
			});
	},

	addRoll: function (req, res) {
		var gameId = req.param('gameId'),
			chatHandle = req.session.User.chatHandle,
			description = req.param('description'),
			dicePool = req.param('dicePool'),
			tokens = req.param('tokens');

		if (!DicePoolService.isValidTaskRoll(dicePool) && !DicePoolService.isValidStandardRoll(dicePool)) {
			res.jsonError('Invalid dice pool');
		} else {
			GameLogService.addRollMessage(gameId, chatHandle, description, dicePool)
				.then(function success() {
					if (tokens && tokens.light === true && tokens.dark === false) {
						return GameService.comsumeDestinyToken(gameId, 'light');
					} else if (tokens && tokens.dark === true && tokens.light === false) {
						return GameService.comsumeDestinyToken(gameId, 'dark');
					} else {
						return q.resolve();
					}
				})
				.then(function success() {
					res.send(200);
				}, function error(err) {
					res.jsonError(err);
				});
		}
	},

	addCrawl: function (req, res) {
		var gameId = req.param('gameId'),
			chatHandle = req.session.User.chatHandle,
			crawlId = req.param('crawlId');

		Crawl.findOne(crawlId, function (err, crawl) {
			if (err || crawl === undefined) {
				res.jsonError('Invalid Crawl');
			} else {
				GameLogService.addCrawlMessage(gameId, chatHandle, crawl)
					.then(function success() {
						res.send(200);
					}, function error(err) {
						res.jsonError(err);
					});
			}
		});
	}

};
