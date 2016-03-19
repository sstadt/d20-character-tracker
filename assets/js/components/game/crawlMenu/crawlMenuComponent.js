
var gameService = require('../../../services/gameService.js');
var constants = require('../../../config/constants.js');

function Crawl(data) {
  this.id = '';
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
      activeCrawl: new Crawl(),
      addingCrawl: false,
      saving: false,
      showDemoCrawl: false,
      demoTitle: '',
      demoSubtitle: '',
      demoCrawl: '',
      demoImage: ''
    };
  },
  partials: {
    'crawl-input-form': require('./crawlMenuFormPartial.html')
  },
  methods: {
    closeModal: function () {
      this.$dispatch(constants.events.game.closeCrawl);
    },
    addCrawl: function (publish) {
      var self = this,
        newCrawl = _.extend(self.activeCrawl);

      newCrawl.game = self.game.id;
      newCrawl.published = publish || false;
      self.saving = true;

      gameService.addCrawl(newCrawl)
        .then(function (crawl) {
          self.game.crawls.push(crawl);
          self.activeCrawl = new Crawl();
          self.addingCrawl = false;
        }, self.gameCrawlsAlert.error)
        .done(function () {
          self.saving = false;
        });
    },
    editCrawl: function (crawl) {
      this.addingCrawl = false;
      this.activeCrawl = _.extend(crawl);
    },
    saveCrawl: function (index, publish) {
      var self = this;

      self.activeCrawl.publish = publish || false;
      self.saving = true;

      gameService.updateCrawl(self.activeCrawl)
        .then(function success() {
          self.game.crawls.$set(index, _.extend(self.activeCrawl));
          self.activeCrawl = new Crawl();
          self.saving = false;
        }, self.gameCrawlsAlert.error);
    },
    cancelEdit: function () {
      this.activeCrawl = new Crawl();
    },
    playCrawl: function (crawl) {
      this.demoTitle = crawl.title;
      this.demoSubtitle = crawl.subtitle;
      this.demoCrawl = crawl.crawl;
      this.demoImage = crawl.imageUrl;
      this.showDemoCrawl = true;
    }
  }
};
