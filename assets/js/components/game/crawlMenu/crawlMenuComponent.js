
var Crawl = require('./crawl.class.js');

var gameService = require('../../../services/gameService.js');

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
      this.$emit('close');
    },
    addCrawl: function () {
      var self = this,
        newCrawl = _.extend(self.activeCrawl),
        deferred = q.defer();

      newCrawl.game = self.game.id;
      self.saving = true;

      gameService.addCrawl(newCrawl)
        .then(function success() {
          self.gameCrawlsAlert.close();
          self.activeCrawl = new Crawl();
          self.addingCrawl = false;
        }, function error(reason) {
          self.gameCrawlsAlert.error(reason);
        })
        .done(function () {
          self.saving = false;
          deferred.resolve();
        });

      return deferred.promise;
    },
    editCrawl: function (crawl) {
      this.addingCrawl = false;
      this.activeCrawl = _.extend(crawl);
    },
    saveCrawl: function () {
      var self = this,
        crawlIndex = _.findIndex(self.crawls, function (crawl) {
          return self.activeCrawl.id === crawl.id;
        }),
        deferred = q.defer();

      self.saving = true;

      gameService.updateCrawl(self.activeCrawl)
        .then(function success() {
          self.gameCrawlsAlert.close();
          self.activeCrawl = new Crawl();
        }, function error(reason) {
          self.gameCrawlsAlert.error(reason);
        })
        .done(function () {
          self.saving = false;
          deferred.resolve();
        });

      return deferred.promise;
    },
    cancelEdit: function () {
      this.activeCrawl = new Crawl();
    },
    deleteCrawl: function (index) {
      var self = this,
        deferred = q.defer();

      self.$refs.gameCrawlsConfirm.ask({
        question: 'Are you sure you want to delete ' + self.game.crawls[index].title + '?',
        yes: function () {
          gameService.deleteCrawl(self.game.crawls[index])
            .then(function success() {
              self.gameCrawlsAlert.close();
            }, function error(reason) {
              self.gameCrawlsAlert.error(reason);
            })
            .done(function () {
              deferred.resolve();
            });
        }
      });

      return deferred.promise;
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
