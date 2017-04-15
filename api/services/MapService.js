
var q = require('q');

function tokenExists(tokens, tokenId) {
  var token = _.find(tokens, function (token) {
    return token.id === tokenId;
  });

  return !_.isUndefined(token);
}

module.exports = {
  addTokens(gameId, mapId, tokens) {
    var deferred = q.defer();

		Map.findOne(mapId, function (err, map) {
			if (err) {
				deferred.reject(mapErrors.notFound);
			} else if (!_.isArray(tokens) || tokens.length === 0) {
				deferred.reject(mapErrors.invalidToken);
			} else {
        var changed = false,
          newTokens = [],
          oldToken;

        for (var i = 0, j = tokens.length; i < j; i++) {
          if (!tokenExists(map.tokens, tokens[i].id)) {
            map.tokens.push(tokens[i]);
            newTokens.push(tokens[i]);
            changed = true;
          }
        }

				if (changed) {
					map.save(function (err, newMap) {
						if (err) {
							deferred.reject(mapErrors.cannotAddToken);
						} else {
							Game.message(gameId, {
								type: 'mapTokenAdded',
								data: {
									mapId: mapId,
									tokens: newTokens
								}
							});
							deferred.resolve();
						}
					});
				} else {
					deferred.reject(mapErrors.tokenExists);
				}
			}
		});

    return deferred.promise;
  }
};
