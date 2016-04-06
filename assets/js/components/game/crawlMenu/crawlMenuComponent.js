
var gameService = require('../../../services/gameService.js');
var constants = require('../../../config/constants.js');

function Crawl(data) {
  this.id = '';
  this.title = '';
  this.subtitle = '';
  this.crawl = '';
  this.imageUrl = '';
  this.published = false;
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
    'crawl-input-form': require('./partials/crawlMenuForm.html')
  },
  methods: {
    closeModal: function () {
      this.$dispatch(constants.events.game.closeCrawl);
    },
    addCrawl: function () {
      var self = this,
        newCrawl = _.extend(self.activeCrawl);

      newCrawl.game = self.game.id;
      self.saving = true;

      gameService.addCrawl(newCrawl)
        .then(function success(crawl) {
          self.game.crawls.push(crawl);
          self.activeCrawl = new Crawl();
          self.addingCrawl = false;
        }, function error(reason) {
          self.gameCrawlsAlert.error(reason);
        })
        .done(function () {
          self.saving = false;
        });
    },
    editCrawl: function (crawl) {
      this.addingCrawl = false;
      this.activeCrawl = _.extend(crawl);
    },
    saveCrawl: function () {
      var self = this,
        crawlIndex = _.findIndex(self.crawls, function (crawl) {
          return self.activeCrawl.id === crawl.id;
        });

      self.saving = true;

      gameService.updateCrawl(self.activeCrawl)
        .then(function success() {
          self.game.crawls.$set(crawlIndex, _.extend(self.activeCrawl));
          self.activeCrawl = new Crawl();
        }, function error(reason) {
          self.gameCrawlsAlert.error(reason);
        })
        .done(function () {
          self.saving = false;
        });
    },
    cancelEdit: function () {
      this.activeCrawl = new Crawl();
    },
    deleteCrawl: function (index) {
      var self = this;

      self.$refs.gameCrawlsConfirm.ask({
        question: 'Are you sure you want to delete ' + self.game.crawls[index].title + '?',
        yes: function () {
          gameService.deleteCrawl(self.game.crawls[index])
            .then(function success() {
              self.game.crawls.splice(index, 1);
            }, function error(reason) {
              self.gameCrawlsAlert.error(reason);
            });
        }
      });
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
