/**
 * CrawlController
 *
 * @description :: Server-side logic for managing crawls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	update: function (req, res) {
		var crawl = req.param('crawl');

		Crawl.update(crawl.id, crawl, function (err, crawl) {
			if (err) {
				res.jsonError(err);
			} else {
				res.send(200);
			}
		});
	},

	destroy: function (req, res) {
		var crawl = req.param('crawl');

		if (crawl && crawl.id) {
			Crawl.destroy(crawl.id, function (err) {
				if (err) {
					res.jsonError(err);
				} else {
					res.send(200);
				}
			});
		} else {
			res.json(ErrorService.generate('Invalid Crawl'));
		}
	}
};
