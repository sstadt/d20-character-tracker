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
	}
};
