/**
 * CrawlController
 *
 * @description :: Server-side logic for managing crawls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	update: function (req, res) {
		var crawl = req.param('crawl'),
			gameId = req.param('gameId');

		Crawl.update(crawl.id, crawl, function (err, updatedCrawl) {
			if (err) {
				res.jsonError(err);
			} else {
				Game.message(gameId, {
					type: 'gameCrawlUpdated',
					game: gameId,
					data: { crawl: updatedCrawl[0] }
				});

				res.send(200);
			}
		});
	},

	destroy: function (req, res) {
		var crawl = req.param('crawl'),
			gameId = req.param('gameId');

		if (crawl) {
			Crawl.destroy(crawl, function (err) {
				if (err) {
					res.jsonError(err);
				} else {
					Game.message(gameId, {
						type: 'gameCrawlDestroyed',
						game: gameId,
						data: { crawl: crawl }
					});
					res.send(200);
				}
			});
		} else {
			res.json(ErrorService.generate('Invalid Crawl'));
		}
	}
};
