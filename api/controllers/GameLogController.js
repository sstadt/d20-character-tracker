/**
 * GameLogController
 *
 * @description :: Server-side logic for managing Gamelogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	get: function (req, res) {
		GameLogService.getLog(req.param('gameId'))
			.then(function success(log) {
				res.json(log);
			}, function error(err) {
				res.jsonError(err);
			});
	},

	addChat: function (req, res) {
		// TODO add message with GameLogService
		res.send(200);
	},

	addRoll: function (req, res) {
		// TODO add message with GameLogService
		res.send(200);
	},

	addCrawl: function (req, res) {
		// TODO add message with GameLogService
		res.send(200);
	},

};
