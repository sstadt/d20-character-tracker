
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');
var FieldSet = require('../../../classes/FieldSet.js');

var mapValidation = {
  name: {
    required: true
  },
  imageUrl: {
    required: true,
    pattern: 'imgurl'
  }
};

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
      newMapForm: new FieldSet(mapValidation),
      editMapForm: new FieldSet(mapValidation),
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
      var defaultImage = 'https://s3.amazonaws.com/ssdcgametable/site_structure/map_ph.jpg',
        newImage = this.newMapForm.fields.imageUrl.value;

      return (this.newMapForm.fields.imageUrl.hasErrors || newImage === '') ? defaultImage : this.newMapForm.fields.imageUrl.value;
    },
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
