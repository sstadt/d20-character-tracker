
var q = require('q');

function LogMessage(data) {
  this.type = data.type;
  this.chatHandle = data.chatHandle;
  this.timeStamp = new Date();
  this.message = data.message;
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

  chatMessage: function (chatHandle, message) {
    return new LogMessage({
      type: 'chat',
      chatHandle: chatHandle,
      message: message
    });
  },

  rollMessage: function (chatHandle, pool) {
    return new LogMessage({
      type: 'roll',
      chatHandle: chatHandle,
      message: DicePoolService.roll(pool)
    });
  },

  crawlMessage: function (chatHandle, crawl) {
    return new LogMessage({
      type: 'crawl',
      chatHandle: chatHandle,
      message: crawl
    });
  }

};
