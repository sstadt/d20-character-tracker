

module.exports = {
  fetchPublicUser: function (id, callback) {
    User.findOne(id, function (err, user) {
      if (err) {
        callback(err);
      } else {
        delete user.config;
        delete user.confirmed;
        delete user.email;
        delete user.invitedGames;
        delete user.requestedGames;
        delete user.encryptedPassword;

        callback(null, user);
      }
    });
  }
};
