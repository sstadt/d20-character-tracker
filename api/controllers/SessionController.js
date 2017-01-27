/*jslint node: true*/
/*globals User, FlashService*/

/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var sessionErrors = sails.config.notifications.Session.error;

module.exports = {

  'new': function (req, res) {
    if (req.session.authenticated === true) {
      res.redirect('/home');
    } else {
      res.view({ title: 'Welcome Back!' });
    }
  },

  create: function (req, res) {
    if (!req.param('email') || !req.param('password')) {
      res.jsonError(sessionErrors.missingPassword);
    } else {
      PasswordService.validatePassword(req.param('email'), req.param('password'))
        .then(function resolve(user) {
          req.session.authenticated = true;
          req.session.User = user.toJSON();
          res.json({ redirect: '/home', });
        }, function reject(err) {
          res.jsonError(err);
        });
    }

  },

  destroy: function (req, res) {
    var game = req.param('game');

    GameService.unsubscribe(req.session, game)
      .then(function success() {
        User.findOne(req.session.User.id, function foundUser(err) {
          if (err) {
            res.jsonError(sessionErrors.logoutError);
          } else {
            req.session.destroy();
            res.json({ redirect: '/', });
          }
        });
      }, function error(err) {
        res.jsonError(err);
      });
  }
};
