
var gameService = require('../../../services/gameService.js');

function Crawl() {
  this.title = '';
  this.subtitle = '';
  this.crawl = '';
  this.imageUrl = '';
}

module.exports = {
  template: require('./crawlMenuTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  data: function () {
    return {
      gameCrawlsAlert: {},
      newCrawl: new Crawl(),
      saving: false
    };
  },
  methods: {
    addCrawl: function () {
      var self = this,
        newCrawl = _.extend(self.newCrawl);

      newCrawl.game = self.game.id;
      self.saving = true;

      gameService.addCrawl(newCrawl)
        .then(function (crawl) {
          self.game.crawls.push(crawl);
          self.newCrawl = new Crawl();
        }, self.gameCrawlsAlert.error)
        .done(function () {
          self.saving = false;
        });
    }
  }
};
