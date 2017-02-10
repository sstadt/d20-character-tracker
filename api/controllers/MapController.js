/**
 * MapController
 *
 * @description :: Server-side logic for managing Maps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var generalErrors = sails.config.notifications.General.error;
var mapErrors = sails.config.notifications.Game.map.error;

module.exports = {

	get: function (req, res) {
		var gameId = req.param('gameId');

		Map.find({ game: gameId }, function (err, maps) {
			if (err) {
				res.jsonError(mapErrors.listNotFound);
			} else {
				var mapList = _.isArray(maps) ? maps : [];
				res.json(mapList);
			}
		});
	},
	create: function (req, res) {
		var newMap = req.param('map'),
			gameId = req.param('gameId');

		newMap.game = gameId;

		Map.create(newMap, function (err, map) {
			if (err) {
				console.log(err);
				res.jsonError(mapErrors.cannotCreate);
			} else {
				Game.message(gameId, {
					type: 'mapAdded',
					data: { map: map }
				});
				res.send(200);
			}
		});
	},
	update: function (req, res) {
		var map = req.param('map'),
			game = req.param('gameId');

		Map.update(map, function (err, updatedMap) {
			if (err) {
				res.jsonError(mapErrors.cannotUpdate);
			} else {
				Game.message(gameId, {
					type: 'mapUpdated',
					data: { map: updatedMap }
				});
				res.send(200);
			}
		});
	},
	destroy: function (req, res) {
		var map = req.param('mapId'),
			game = req.param('gameId');

		Map.destroy(map, function (err) {
			if (err) {
				res.jsonError(mapErrors.cannotDelete);
			} else {
				Game.message(gameId, {
					type: 'mapRemoved',
					data: { map: map }
				});
				res.send(200);
			}
		});
	},
	addToken: function (req, res) {
		var mapToken = req.param('token'),
			mapId = req.param('mapId'),
			gameId = req.param('gameId');

		Map.findOne(mapId, function (err, map) {
			if (err) {
				res.jsonError(mapErrors.notFound);
			} else if (_.isUndefined(token.id)) {
				res.jsonError(mapErrors.invalidToken);
			} else {
				var oldToken = _.find(map.tokens, function (token) {
					return token.id === mapToken.id;
				});

				if (_.isUndefined(oldToken)) {
					map.tokens.push(mapToken);
					map.save(function (err, newMap) {
						if (err) {
							res.jsonError(mapErrors.cannotAddToken);
						} else {
							Game.message(gameId, {
								type: 'mapTokenAdded',
								data: {
									mapId: mapId,
									token: mapToken
								}
							});
							res.send(200);
						}

					});
				} else {
					res.jsonError(mapErrors.tokenExists);
				}
			}
		});
	},
	removeToken: function (req, res) {
		var gameId = req.param('gameId'),
			mapId = req.param('mapId'),
			tokenId = req.param('tokenId');

		Map.findOne(mapId, function (err, map) {
			if (err) {
				res.jsonError(mapErrors.notFound);
			} else if (_.isUndefined(token.id)) {
				res.jsonError(mapErrors.invalidToken);
			} else {
				var tokenIndex = _.findIndex(map.tokens, function (token) {
					return token.id === mapToken.id;
				});

				if (tokenIndex > -1) {
					map.tokens.splice(tokenIndex, 1);
					map.save(function (err, newMap) {
						if (err) {
							res.jsonError(mapErrors.cannotRemoveToken);
						} else {
							Game.message(gameId, {
								type: 'mapTokenRemoved',
								data: {
									mapId: mapId,
									tokenId: tokenId
								}
							});
							res.send(200);
						}

					});
				} else {
					res.jsonError(mapErrors.tokenExists);
				}
			}
		});
	},
	moveToken: function (req, res) {
		var gameId = req.param('gameId'),
			mapId = req.param('mapId'),
			x = req.param('x'),
			y = req.param('y');

		Map.findOne(mapId, function (err, map) {
			if (err) {
				res.jsonError(mapErrors.notFound);
			} else if (_.isUndefined(token.id)) {
				res.jsonError(mapErrors.invalidToken);
			} else {
				var tokenIndex = _.findIndex(map.tokens, function (token) {
					return token.id === mapToken.id;
				});

				if (_.isNumber(x) && _.isNumber(y)) {
					map.tokens[tokenIndex].x = x;
					map.tokens[tokenIndex].y = y;
					map.save(function (err, newMap) {
						if (err) {
							res.jsonError(mapErrors.cannotMoveToken);
						} else {
							Game.message(gameId, {
								type: 'mapTokenMoved',
								data: {
									mapId: mapId,
									token: map.tokens[tokenIndex]
								}
							});
							res.send(200);
						}

					});
				} else {
					res.jsonError(mapErrors.invalidCoordinates);
				}
			}
		});
	}

};
