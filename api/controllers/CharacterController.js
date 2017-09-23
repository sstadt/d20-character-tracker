/**
 * CharacterController
 *
 * @description :: Server-side logic for managing characters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var charErrors = sails.config.notifications.Character.error;

module.exports = {

	get: function (req, res) {
		Character.find({ owner: req.session.User.id }, function (err, characters) {
			if (err) {
				res.jsonError(characterErrors.listNotFound);
			} else {
				var characterList = _.isArray(characters) ? characters : [];
		    if (characters) User.subscribe(req.socket, characters);
				res.json(characterList);
			}
		});
	},

	getParty: function (req, res) {
		var gameId = req.param('gameId');

		Character.find({ game: gameId }, function (err, characters) {
			if (err) {
				res.jsonError(characterErrors.listNotFound);
			} else {
				var characterList = _.isArray(characters) ? characters : [];
		    if (characters) User.subscribe(req.socket, characters);
				res.json(characterList);
			}
		});
	},

	create: function (req, res) {
		var newCharacter = req.param('character') || {};

		newCharacter.owner = req.session.User.id;
		newCharacter.skills = CharacterService.getNewSkillList();

		Character.create(newCharacter, function (err, character) {
			if (err) {
				console.log(err);
				res.jsonError(characterErrors.cannotCreate);
			} else {
				User.message(character.owner, {
					type: 'newCharacterCreated',
					data: { character: character }
				});

				res.send(200);
			}
		});
	},

	update: function (req, res) {
		var updatedCharacter = req.param('character');

		Character.update(updatedCharacter.id, updatedCharacter, function (err, character) {
			if (err) {
				res.jsonError(characterErrors.cannotUpdate);
			} else {
				User.message(character[0].owner, {
					type: 'characterUpdated',
					data: { character: character[0] }
				});

				if (character[0].game) {
					Game.message(character[0].game, {
						type: 'partyMemberUpdated',
						data: { character: character[0] }
					});
				}

				res.send(200);
			}
		});
	},

	destroy: function (req, res) {
		var characterId = req.param('characterId'),
			gameId = req.param('gameId');

		Character.destroy(characterId, function (err) {
			if (err) {
				res.jsonError(characterErrors.cannotDelete);
			} else {
				User.message(req.session.User.id, {
					type: 'characterRemoved',
					data: { character: characterId }
				});

				if (gameId) {
					Game.message(gameId, {
						type: 'partyMemberRemoved',
						data: { character: characterId }
					});
				}

				res.send(200);
			}
		});
	}

};
