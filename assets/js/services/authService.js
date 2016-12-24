
var config = require('../lib/config.js');

module.exports = {
  login: function (email, password) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.login, {
      email,
      password
    }, function (response) {
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  logout: function () {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.logout, function (response) {
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  signup: function (args) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.signup, args, function (response) {
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  },
  verify: function (token) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.verify, { token }, function (response) {
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  }

};
