
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
      demoImage: '',
      testConfirm: function () {
        var self = this;

        self.$refs.gameCrawlsConfirm.ask({
          question: 'join me, and together we will rule the galaxy!',
          yesLabel: 'I\'ll never join you!',
          noLabel: 'no thx, bro',
          yes: function () {
            console.log('!!! confirmed !!!');
            console.log(self);
          },
          no: function () {
            console.log('!!! denied !!!');
            console.log(self);
          }
        });
      }
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
    saveCrawl: function (index, publish) {
      var self = this;

      if (publish) {
        self.activeCrawl.publish = publish;
      }
      self.saving = true;

      gameService.updateCrawl(self.activeCrawl)
        .then(function success() {
          self.game.crawls.$set(index, _.extend(self.activeCrawl));
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

      gameService.deleteCrawl(self.game.crawls[index])
        .then(function success() {
          self.game.crawls.splice(index, 1);
        }, function error(reason) {
          self.gameCrawlsAlert.error(reason);
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
