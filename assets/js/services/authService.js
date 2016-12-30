
var config = require('../lib/config.js');

module.exports = {
  login: function (email, password) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.login, {
      email,
      password
    }, function (response) {
      var showResend;

      if (response.err) {
        response.showResend = response.err.indexOf('must verify') > -1;
        deferred.reject(response);
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
  },
  resendValidation: function (email) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.resendVerification, { email }, function (response) {
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  requestReset: function (email) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.requestReset, { email }, function (response) {
      console.log(response);
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  },
  resetPassword: function (token, password, confirm) {
    var deferred = q.defer();

    io.socket.post(config.endpoints.auth.resetPassword, { token, password, confirm }, function (response) {
      if (response.err) {
        deferred.reject(response.err);
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }

};
