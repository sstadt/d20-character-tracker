
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');
var FieldSet = require('../../../classes/FieldSet.js');

const DEFAULT_MAP_IMAGE = 'https://s3.amazonaws.com/ssdcgametable/site_structure/map_ph.jpg';

var newMapValidation = {
  name: {
    required: true
  },
  imageUrl: {
    required: true,
    pattern: 'imgurl'
  }
};

var editMapValidation = _.extend(newMapValidation);

editMapValidation.id = {};

module.exports = {
  template: require('./mapMenuTemplate.html'),
  props: {
    game: {
      type: String,
      required: true
    },
    maps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      view: 'list',
      saving: false,
      newMapForm: new FieldSet(newMapValidation),
      editMapForm: new FieldSet(editMapValidation),
      gameService: undefined,
      confirmDelete: {
        title: 'Delete Map',
        content: 'No map selected',
        ok: 'Yes',
        cancel: 'No',
        mapId: ''
      },
    };
  },
  computed: {
    newMapImage() {
      var newImage = this.newMapForm.fields.imageUrl.value;

      return (this.newMapForm.fields.imageUrl.hasErrors || newImage === '') ? DEFAULT_MAP_IMAGE : this.newMapForm.fields.imageUrl.value;
    },
    editMapImage() {
      var editImage = this.editMapForm.fields.imageUrl.value;

      return (this.editMapForm.fields.imageUrl.hasErrors || editImage === '') ? DEFAULT_MAP_IMAGE : this.editMapForm.fields.imageUrl.value;
    }
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game
      }
    });
  },
  methods: {
    setView(view) {
      this.view = view;
    },
    addMap() {
      var self = this,
        deferred = q.defer(),
        newMap;

      if (self.newMapForm.isValid()) {
        newMap = self.newMapForm.export();
        self.saving = true;

        self.gameService.createMap({ map: newMap })
          .then(function success() {
            self.setView('list');
            self.newMapForm.reset();
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
    deleteMap(map) {
      this.confirmDelete.content = `Are you sure you want to delete ${map.name}?`;
      this.confirmDelete.mapId = map.id;
      this.$refs.confirmDeleteDialog.open();
    },
    setShared: _.debounce(function (map) {
      var self = this,
        deferred = q.defer();

      self.gameService.updateMap({ map: { id: map.id, shared: map.shared } })
        .fail(function (reason) {
          self.$emit('error', reason.err);
        })
        .done(function () {
          deferred.resolve();
        });

      return deferred.promise;
    }, 500),
    editMap(map) {
      this.editMapForm.fields.id.value = map.id;
      this.editMapForm.fields.name.value = map.name;
      this.editMapForm.fields.imageUrl.value = map.imageUrl;
      this.setView('edit');
    },
    saveMap() {
      var self = this,
        deferred = q.defer();

      if (self.editMapForm.isValid()) {
        self.saving = true;
        self.gameService.updateMap({ map: self.editMapForm.export() })
          .then(function success() {
            self.setView('list');
            self.editMapForm.reset();
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
    confirmDeleteMap() {
      var self = this,
        deferred = q.defer();

      if (this.confirmDelete.mapId !== '') {
        self.gameService.deleteMap({ mapId: this.confirmDelete.mapId })
          .fail(function (reason) {
            self.$emit('error', reason.err);
          })
          .done(function () {
            this.confirmDelete.mapId = '';
            deferred.resolve();
          });
      } else {
        self.$emit('error', 'Invalid map');
        deferred.resolve();
      }

      return deferred.promise;
    }
  }
};
