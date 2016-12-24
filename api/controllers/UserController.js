/*jslint node: true*/
/*globals User, FlashService, RegistrationService, Token*/

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var userErrors = sails.config.notifications.User.error,
  userSuccesses = sails.config.notifications.User.success,
  tokenErrors = sails.config.notifications.Token.error;

module.exports = {

  splash: function (req, res) {
    res.view({
      title: sails.config.globals.pageTitle.splash
    });
  },

  'new': function (req, res) {
    res.view({
      title: sails.config.globals.pageTitle.register,
      script: 'public'
    });
  },

  setHandle: function (req, res) {
    req.session.User.chatHandle = req.param('handle');

    User.update(req.session.User.id, req.session.User, function (err, user) {
      if (err) {
        res.serverError(err);
      }

      res.send(200);
    });
  },

  verify: function (req, res) {
    Token.findOne({ token: req.param('token') }, function (err, token) {
      if (err) {
        res.jsonError(tokenErrors.notFound('registration'));
        // FlashService.error(req, tokenErrors.notFound('registration'));
        // res.redirect('/login');
      } else if (!token) {
        res.jsonError(userErrors.cannotVerify);
      } else {
        User.update(token.user, { confirmed: true }, function (err) {
          console.log(err);
          if (err) {
            res.jsonError(userErrors.cannotVerify);
            // FlashService.error(req, userErrors.cannotVerify);
            // res.redirect('/login');
          }

          Token.destroy(token.id, function () {
            res.json({ message: userSuccesses.verified, redirect: '/home' });
            // FlashService.success(req, userSuccesses.verified);
            // res.redirect('/login');
          });
        });
      }
    });
  },

  create: function (req, res) {
    var userObj = {
      email: req.param('email'),
      chatHandle: req.param('handle'),
      password: req.param('password'),
      confirmation: req.param('confirmation'),
    };

    if (PasswordService.isSecure(userObj.password, userObj.confirmation)) {
      User.create(userObj, function userCreated(err, user) {
        if (err) {
          var errorMsg = userErrors.cannotCreateUser;

          if (err.code === 'E_VALIDATION') {
            if (err.message.indexOf('already exists')) {
              errorMsg = (err.message.indexOf('chatHandle') > -1) ? userErrors.duplicateChatHandle : userErrors.duplicateEmail;
            } else {
              errorMsg = 'There are invalid fields';
            }
          }

          res.jsonError(errorMsg);
        } else {
          RegistrationService.generateValidationEmail(user)
            .then(function resolve() {
              res.json({ redirect: '/home' });
            }, function reject(err) {
              res.jsonError(userErrors.cannotRegister);
            });
        }
      });
    } else {
      res.jsonError(PasswordService.getLastError());
    }
  },

  resend: function (req, res) {
    User.findOne({ email: req.param('email') }, function (err, user) {
      if (err) {
        FlashService.error(req, userErrors.notFound);
        res.redirect('/register');
      }

      Token.destroy({ user: user.id }, function (err) {
        if (err) {
          FlashService.error(req, tokenErrors.cannotResendValidation(user.email));
          res.redirect('/login');
        }

        RegistrationService.generateValidationEmail(user)
          .then(function resolve() {
            FlashService.success(req, userSuccesses.verificationSent);
            res.redirect('/login');
          }, function reject(err) {
            console.log(err); // TODO: this error needs dev attention
            FlashService.error(req, userErrors.cannotRegister);
            res.redirect('/login');
          });
      });
    });
  },

  recoverPassword: function (req, res) {
    res.view({
      title: 'recover password',
      script: 'public',
      email: req.param('email') || '',
      success: req.param('success')
    });
  },

  sendResetEmail: function (req, res) {
    var email = req.param('email'),
      defaultView = { title: 'recover password', script: 'public', email: email || '' };

    User.findOne({ email: email }, function (err, user) {
      if (err || user === undefined) {
        FlashService.error(req, userErrors.notFound);
        FlashService.addVar(req, 'email', email);
        res.redirect('/recover');
      }

      if (user === undefined) {
        FlashService.error(req, userErrors.notFound);
        FlashService.addVar(req, 'email', email);
        res.redirect('/recover');
      } else {
        RegistrationService.generateResetEmail(user)
          .then(function resolve() {
            FlashService.success(req, userSuccesses.passwordResetSent);
            res.redirect('/login');
          }, function reject(err) {
            FlashService.error(req, userErrors.cannotResetPassword);
            FlashService.addVar(req, 'email', email);
            res.redirect('/recover');
          });
      }
    });
  },

  resetPassword: function (req, res) {
    var token = req.param('token') || '',
      password = req.param('password'),
      confirmation = req.param('confirmation'),
      view = {
        token: token,
        user: { email: '' },
        title: 'reset password',
        script: 'public'
      };

    RegistrationService.validateResetToken(token)
      .then(function resolve(user) {
        var errors;

        view.user = user;

        // a password was submitted for reset
        if (password || confirmation) {

          // password is secure according to configured rules
          if (PasswordService.isSecure(password, confirmation)) {
            PasswordService.resetPassword(password, user)
              .then(function resolve() {
                FlashService.success(req, userSuccesses.passwordReset);
                res.redirect('/login');
              }, function reject(err) {
                FlashService.error(req, userErrors.cannotResetPassword);
                FlashService.cycleFlash(req, res);
                res.view(view);
              });

          // password is not secure
          } else {
            errors = PasswordService.getLastError();
            for (var i = 0, j = errors.length; i < j; i++) {
              FlashService.error(req, errors[i]);
            }
            FlashService.cycleFlash(req, res);

            res.view(view);
          }

        // a password was not submitted for reset
        } else {
          res.view(view);
        }

      }, function reject(err) {
        FlashService.error(req, err);
        res.redirect('/recover');
        return;
      });
  },

  show: function (req, res) {
    res.view({
      title: 'profile',
      script: 'public'
    });
  },

  self: function (req, res) {
    // TODO: check to see if the user is already subscribed
    User.subscribe(req.socket, req.session.User.id);
    res.json(req.session.User);
  },

  search: function (req, res) {
    User.find({
      id: { '!': req.session.User.id },
      email: { startsWith: req.param('email') }
    }, function userFound(err, users) {
      if (err) {
        res.serverError(err);
      }

      res.json(users.map(function (user) {
        return user.toJSON();
      }));
    });
  }
};
