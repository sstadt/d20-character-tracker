/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request'),
  apiUrl = sails.config.fadApi.url,
  apiKey = sails.config.fadApi.key;

module.exports = {
	index: function (req, res) {
    var endpoint = apiUrl + req.param('model');

    request(endpoint, function (err, response) {
      if (err) {
        res.serverError(err);
      }

      res.json(JSON.parse(response.body));
    });
  },
  show: function (req, res) {
    var endpoint = apiUrl + req.param('model') + '/' + req.param('id');

    request(endpoint, function (err, response) {
      if (err) {
        res.serverError(err);
      }

      res.json(JSON.parse(response.body));
    });
  }
};

