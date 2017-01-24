
var Crawl = require('./crawl.class.js');

var gameService = require('../../../services/gameService.js');
var FieldSet = require('../../../classes/FieldSet.js');

var crawlValidation = {
  id: {},
  game: {},
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
        content: 'foo',
        ok: 'Yes',
        cancel: 'No',
        crawlId: ''
      }
    };
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
        self.newCrawlForm.fields.game.value = self.game.id;
        newCrawl = self.newCrawlForm.export();
        self.saving = true;

        gameService.addCrawl(newCrawl)
          .then(function success() {
            self.newCrawlForm.reset();
            self.addingCrawl = false;
          }, function error(reason) {
            self.$emit('error', reason);
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
      this.editCrawlForm.fields.game.value = crawl.game;
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

      gameService.updateCrawl(updatedCrawl)
        .then(function success() {
          self.editCrawlForm.reset();
        }, function error(reason) {
          self.$emit('error', reason);
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

      gameService.sendCrawl(self.game.id, crawl.id)
        .then(function success() {
          self.$emit('close');
        }, function error(reason) {
          self.$emit('error', reason);
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
    confirmDeleteCrawl() {
      var self = this,
        deferred = q.defer();

      gameService.deleteCrawl(self.game.id, self.confirmDelete.crawlId)
        .fail(function (reason) {
          self.$emit('error', reason);
          deferred.resolve();
        });

      return deferred.promise;
    },
    playCrawl(crawl) {
      this.closeModal();
      this.$emit('play-crawl', crawl);
    }
  }
};
