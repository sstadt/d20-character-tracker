/**
 * ImageSearchController
 *
 * @description :: Server-side logic for managing imagesearches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request'),
	apiKey = sails.config.apiKeys.googleCustomSearch.key,
	searchId = sails.config.apiKeys.googleCustomSearch.id,
  apiUrl = 'https://www.googleapis.com/customsearch/v1?type=image&key=' + apiKey + '&cx=' + searchId;

module.exports = {

	index: function (req, res) {
    var endpoint = apiUrl + '&q=' + req.param('q');

    request(endpoint, function (err, response) {
      if (err) {
        res.jsonError(err);
      }

      res.json(JSON.parse(response.body));
    });
	}

};
