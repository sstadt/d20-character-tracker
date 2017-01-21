
var q = require('q');

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
  },

  updateAvatar: function (req, url) {
    var deferred = q.defer(),
      games;

    User.findOne(req.session.User.id)
      .populate('gameMaster')
      .populate('player')
      .exec(function (err, user) {
        if (err) {
          deferred.reject(err);
        } else if (!user) {
          deferred.reject('User not found');
        } else {
          req.session.User.config.avatar = url;
          user.config.avatar = url;
          games = user.player;

          user.save(user, function (err) {
            if (err) {
              deferred.reject(err);
            } else {
              User.message(user.id, {
                type: 'playerConfigUpdated',
                data: { config: user.config }
              });

              _.forEach(games, function (game) {
                Game.message(game.id, {
                  type: 'playerConfigUpdated',
                  data: { user: user.id, config: user.config }
                });
              });

              deferred.resolve();
            }
          });
        }
      });

    return deferred.promise;
  }

};
