
var Crawl = require('./crawl.class.js');

var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');
var FieldSet = require('../../../classes/FieldSet.js');

var gameService;

var crawlValidation = {
  id: {},
  gameId: {},
  title: {
    required: true
  },
  subtitle: {},
  crawl: {
    required: true
  },
  imageUrl: {
    required: true,
    pattern: 'url'
  }
};

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
      newCrawlForm: new FieldSet(crawlValidation),
      editCrawlForm: new FieldSet(crawlValidation),
      addingCrawl: false,
      saving: false,
      deleting: false,
      confirmDelete: {
        title: 'Delete Crawl',
        content: 'No crawl selected',
        ok: 'Yes',
        cancel: 'No',
        crawlId: ''
      }
    };
  },
  created() {
    var self = this;

    gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game.id
      },
      debug: true
    });
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    addCrawl() {
      var self = this,
        deferred = q.defer(),
        newCrawl;

      if (self.newCrawlForm.isValid()) {
        self.newCrawlForm.fields.gameId.value = self.game.id;
        newCrawl = self.newCrawlForm.export();
        self.saving = true;

        gameService.addCrawl({ crawl: newCrawl })
          .then(function success() {
            self.newCrawlForm.reset();
            self.addingCrawl = false;
          }, function error(reason) {
            self.$emit('error', reason.err);
          })
          .done(function () {
            self.saving = false;
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    },
    editCrawl(crawl) {
      this.editCrawlForm.fields.id.value = crawl.id;
      this.editCrawlForm.fields.gameId.value = crawl.gameId;
      this.editCrawlForm.fields.title.value = crawl.title;
      this.editCrawlForm.fields.subtitle.value = crawl.subtitle;
      this.editCrawlForm.fields.crawl.value = crawl.crawl;
      this.editCrawlForm.fields.imageUrl.value = crawl.imageUrl;
      this.addingCrawl = false;
    },
    saveCrawl() {
      var self = this,
        deferred = q.defer(),
        updatedCrawl = self.editCrawlForm.export();

      self.saving = true;

      gameService.updateCrawl({ crawl: updatedCrawl })
        .then(function success() {
          self.editCrawlForm.reset();
        }, function error(reason) {
          self.$emit('error', reason.err);
        })
        .done(function () {
          self.saving = false;
          deferred.resolve();
        });

      return deferred.promise;
    },
    cancelEdit() {
      this.editCrawlForm.reset();
    },
    sendCrawl(crawl) {
      var self = this,
        deferred = q.defer();

      gameService.sendCrawl({ crawlId: crawl.id })
        .then(function success() {
          self.$emit('close');
        }, function error(reason) {
          self.$emit('error', reason.err);
        })
        .done(function () {
          deferred.resolve();
        });

      return deferred.promise;
    },
    deleteCrawl(crawl) {
      this.confirmDelete.content = `Are you sure you want to delete ${crawl.title}?`;
      this.confirmDelete.crawlId = crawl.id;
      this.$refs.confirmDeleteDialog.open();
    },
    confirmDeleteCrawl(result) {
      var self = this,
        deferred = q.defer();

      if (result === 'ok') {
        gameService.deleteCrawl({ crawlId: self.confirmDelete.crawlId })
          .fail(function (reason) {
            self.$emit('error', reason.err);
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    },
    playCrawl(crawl) {
      this.closeModal();
      this.$emit('play-crawl', crawl);
    }
  }
};
