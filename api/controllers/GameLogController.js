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

	addMessage: function (req, res) {
		var gameId = req.param('gameId'),
			chatHandle = req.session.User.chatHandle,
			message = req.param('message');

		GameLogService.addChatMessage(gameId, chatHandle, message)
			.then(function success() {
				res.send(200);
			}, function error(err) {
				res.json(err);
			});
	},

	addRoll: function (req, res) {
		// TODO add message with GameLogService
		res.send(200);
	},

};
