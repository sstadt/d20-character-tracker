
var q = require('q');

function LogMessage(data) {
  this.type = data.type;
  this.chatHandle = data.chatHandle;
  this.timeStamp = new Date();
  this.message = data.message;
}

function addLogMessage(gameId, type, chatHandle, message) {
  var deferred = q.defer(),
    newMessage = new LogMessage({
      type: type,
      chatHandle: chatHandle,
      message: message
    });

  GameLog.findOne({ game: gameId }, function (err, log) {
    if (err) {
      deferred.reject(ErrorService.parse(err));
    } else if (!log) {
      deferred.reject(ErrorService.generate('Game log not found'));
    } else {
      log.log.unshift(newMessage);
      log.save(function (err) {
        if (err) {
          deferred.reject(ErrorService.parse(err));
        } else {
          deferred.resolve(newMessage);
        }
      });
    }
  });

  return deferred.promise;
}

module.exports = {

  getLog: function (gameId) {
    var deferred = q.defer();

    GameLog.findOne({ game: gameId }, function (err, log) {
      if (err) {
        deferred.reject(err);
      } else if (log) {
        deferred.resolve(log);
      } else {
        GameLog.create({ game: gameId }, function (err, log) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(log);
          }
        });
      }
    });

    return deferred.promise;
  },

  addChatMessage: function (gameId, chatHandle, message) {
    var deferred = q.defer();

    addLogMessage(gameId, 'chat', chatHandle, message)
      .then(function success(newMessage) {
				Game.message(gameId, {
					type: 'newChatMessage',
					game: gameId,
					data: newMessage
				});
        deferred.resolve();
      }, function error(err) {
        deferred.reject(err);
      });

    return deferred.promise;
  },

  addRollMessage: function (gameId, chatHandle, pool) {
    var deferred = q.defer();

    addLogMessage(gameId, 'roll', chatHandle, DicePoolService.roll(pool))
      .then(function success(message) {
				Game.message(gameId, {
					type: 'newRollMessage',
					game: gameId,
					data: message
				});
        deferred.resolve();
      }, function error(err) {
        deferred.reject(err);
      });

    return deferred.promise;
  },

  addCrawlMessage: function (gameId, chatHandle, crawl) {
    var deferred = q.defer();

    addLogMessage(gameId, 'crawl', chatHandle, crawl)
      .then(function success(message) {
				Game.message(gameId, {
					type: 'newCrawlMessage',
					game: gameId,
					data: message
				});
        deferred.resolve();
      }, function error(err) {
        sails.log(err);
        deferred.reject(err);
      });

    return deferred.promise;
  }

};
