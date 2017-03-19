/**
 * NpcController
 *
 * @description :: Server-side logic for managing npcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var npcErrors = sails.config.notifications.Game.npc.error;

module.exports = {

	get: function (req, res) {
		var gameId = req.param('gameId');

		Npc.find({ game: gameId }, function (err, npcs) {
			if (err) {
				res.jsonError(npcErrors.listNotFound);
			} else {
				var npcList = _.isArray(npcs) ? npcs : [];
				res.json(npcList);
			}
		});
	},

	create: function (req, res) {
		var newNpc = req.param('npc'),
			gameId = req.param('gameId');

		newNpc.owner = req.session.User.id;
		newNpc.game = gameId;

		Npc.create(newNpc, function (err, npc) {
			if (err) {
				console.log(err);
				res.jsonError(npcErrors.cannotCreate);
			} else {
				Game.message(gameId, {
					type: 'npcAdded',
					data: { npc: npc }
				});
				res.send(200);
			}
		});
	},

	update: function (req, res) {
		var updatedNpc = req.param('npc'),
			gameId = req.param('gameId');

		Npc.update(updatedNpc.id, updatedNpc, function (err, npc) {
			if (err) {
				res.jsonError(npcErrors.cannotUpdate);
			} else {
				Game.message(gameId, {
					type: 'npcUpdated',
					data: { npc: npc[0] }
				});
				res.send(200);
			}
		});
	},

	destroy: function (req, res) {
		var npcId = req.param('npcId'),
			gameId = req.param('gameId');

		Npc.destroy(npcId, function (err) {
			if (err) {
				res.jsonError(npcErrors.cannotDelete);
			} else {
				Game.message(gameId, {
					type: 'npcRemoved',
					data: { npc: npcId }
				});
				res.send(200);
			}
		});
	}

};
