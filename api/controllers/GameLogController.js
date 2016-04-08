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
		var gameId = req.param('gameId'),
			chatHandle = req.session.User.chatHandle,
			description = req.param('description'),
			dicePool = req.param('dicePool');

		if (!_.isString(description)) {
			res.json(ErrorService.generate('Invalid roll description'));
		} else if (!DicePoolService.isValid(dicePool)) {
			res.json(ErrorService.generate('Invalid dice pool'));
		} else {
			GameLogService.addRollMessage(gameId, chatHandle, description, dicePool)
				.then(function success() {
					res.send(200);
				}, function error(err) {
					res.json(err);
				});
		}
	},

};
