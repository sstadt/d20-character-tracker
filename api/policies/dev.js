

module.exports = function (req, res, next) {
  if (sails.config.environment === 'development') {
    return next();
  }

  return res.view(404);
};
