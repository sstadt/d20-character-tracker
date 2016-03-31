
var constants = require('../config/constants.js');

var user,
  fetchingUser = false;

module.exports = {
  getUserInfo: function () {
    var deferred = q.defer(),
      interval;

    // data is already populated, return it
    if (user) {
      deferred.resolve(user);

    // call is processing, wait until finished and return data
    } else if (fetchingUser) {
      interval = setInterval(function () {
        if (!fetchingUser) {
          if (user) {
            deferred.resolve(user);
          } else {
            deferred.reject('there was an error retrieving your user data');
          }

          clearInterval(interval);
        }
      }, 200);

    // data has not been requested yet, request it
    } else {
      fetchingUser = true;
      io.socket.get(constants.endpoints.user.getSelf, function (data) {
        if (data.err) {
          console.error(err);
          deferred.reject('there was an error retrieving your user data');
        } else {
          user = data;
          deferred.resolve(user);
        }

        fetchingUser = false;
      });
    }

    return deferred.promise;
  },
  setChatHandle: function (newHandle) {
    var deferred = q.defer();

    io.socket.post(constants.endpoints.user.setHandle, { handle: newHandle }, function (err) {
      if (err) {
        console.error(err);
        deferred.reject('There was an error setting your chat handle');
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};
