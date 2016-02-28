

define([
  'q',
  'io',
  'constants'
], function (q, io, constants) {
  return {
    leave: function (channelId) {
      var deferred = q.defer();

      io.socket.post(constants.endpoints.channel.leave, { channel: channelId }, function (err) {
        if (err) {
          console.error(err);
          deferred.reject('There was an error leaving the channel');
        } else {
          deferred.resolve();
        }
      });

      return deferred.promise;
    }
  };
});
