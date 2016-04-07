/**
 * dev
 *
 * @module      :: Policy
 * @description :: Shows a 404 page in production when a page is flagged as dev only
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {
  if (sails.config.environment === 'development') {
    return next();
  }

  return res.view(404);
};
