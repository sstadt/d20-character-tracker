/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request'),
  apiUrl = sails.config.swApi.url,
  apiKey = sails.config.swApi.key;

module.exports = {
	index: function (req, res) {
    var endpoint = apiUrl + req.param('model') + '?key=' + apiKey;

    request(endpoint, function (err, response) {
      if (err) {
        res.jsonError(err);
      }

      res.json(JSON.parse(response.body));
    });
  },
  show: function (req, res) {
    var endpoint = apiUrl + req.param('model') + '/' + req.param('id') + '?key=' + apiKey;

    request(endpoint, function (err, response) {
      if (err) {
        res.serverError(err);
      }

      res.json(JSON.parse(response.body));
    });
  }
};
