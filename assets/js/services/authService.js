
var config = require('../lib/config.js');

module.exports = {
  login: function (email, password) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.login, {
      email: email,
      password: password
    }, function (response) {
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  logout: function (email, password) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.logout, function (response) {
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  }
};
