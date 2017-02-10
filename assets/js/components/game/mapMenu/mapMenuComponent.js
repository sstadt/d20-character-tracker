
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
      type: Object,
      required: true,
      saving: false
    }
  },
  data() {
    return {
      view: 'list',
      saving: false,
      newMapForm: new FieldSet(mapValidation),
      editMapForm: new FieldSet(mapValidation),
      gameService: undefined
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
        gameId: self.game.id
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

        console.log(newMap);

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
    }
  }
};
