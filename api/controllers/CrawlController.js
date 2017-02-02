/**
 * CrawlController
 *
 * @description :: Server-side logic for managing crawls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var crawlErrors = sails.config.notifications.Game.crawl.error;

module.exports = {
	update: function (req, res) {
		var crawl = req.param('crawl');

		Crawl.update(crawl.id, crawl, function (err) {
			if (err) {
				res.jsonError(err);
			} else {
				Game.message(crawl.gameId, {
					type: 'gameCrawlUpdated',
					data: { crawl: crawl }
				});

				res.send(200);
			}
		});
	},

	destroy: function (req, res) {
		var crawl = req.param('crawlId'),
			gameId = req.param('gameId');

		if (crawl) {
			Crawl.destroy(crawl, function (err) {
				if (err) {
					res.jsonError(err);
				} else {
					Game.message(gameId, {
						type: 'gameCrawlDestroyed',
						data: { crawl: crawl }
					});
					res.send(200);
				}
			});
		} else {
			res.json(crawlErrors.invalidCrawl);
		}
	}
};
