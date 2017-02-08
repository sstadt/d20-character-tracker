
var config = require('../../lib/config.js');

var Service = require('../../classes/Service.js');

var userService = require('../../services/userService.js');

module.exports = {
  template: require('./mapViewerTemplate.html'),
  props: {
    game: {
      type: String,
      required: true
    },
    showGmTools: {
      type: Boolean,
      defaultsTo: false
    },
    map: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: {},
      mapLeft: 0,
      mapTop: 0,
      gridLeft: 0,
      gridTop: 0,
      mapZoom: 20, // 100% start
      lastMouseLeft: 0,
      lastMouseTop: 0,
      resizingGrid: false,
      dragging: false,
      gameService: undefined
    };
  },
  computed: {
    mapScale() {
      return ((this.mapZoom / 100) * 490 + 10) / 100;
    },
    mapTransform() {
      return `translateX(-50%) translateY(-50%) scale(${this.mapScale}, ${this.mapScale})`;
    },
    gridPosition() {
      return `${this.gridLeft}px ${this.gridTop}px`;
    },
    tokenIcon() {
      return this.resizingGrid ? 'resize' : 'grid';
    }
  },
  watch: {
    map(oldMap, newMap) {
      if (oldMap.id !== newMap.id) {
        this.setMapPositioning();
      }
    }
  },
  components: {
    mapToken: require('./mapToken/mapTokenComponent.js')
  },
  created() {
    var self = this;

    self.setMapPositioning();

    // get user data
    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game
      }
    });
  },
  methods: {
    emitError(msg) {
      this.$emit('error', msg);
    },
    getLocalMaps() {
      var localMaps;

      try {
        localMaps = JSON.parse(localStorage.maps);
      } catch(e) {
        console.error('Invalid browser map cache, resetting map settings.');
        localMaps = {};
        if (localStorage) localStorage.maps = JSON.stringify(localMaps);
      }

      if (!localMaps[this.map.id]) {
        localMaps[this.map.id] = {};
      }

      return localMaps;
    },
    setMapPositioning() {
      if (!_.isUndefined(localStorage) && localStorage.maps) {
        let localMaps = this.getLocalMaps();

        this.mapLeft = localMaps[this.map.id].mapLeft || 0;
        this.mapTop = localMaps[this.map.id].mapTop || 0;
        this.gridLeft = localMaps[this.map.id].gridLeft || 0;
        this.gridTop = localMaps[this.map.id].gridTop || 0;
        this.mapZoom = localMaps[this.map.id].mapZoom || 20; // 100% start
      }
    },
    saveMapPositioning: _.debounce(function () {
      if (!_.isUndefined(localStorage)) {
        var localMaps = this.getLocalMaps();

        localMaps[this.map.id].mapLeft = this.mapLeft;
        localMaps[this.map.id].mapTop = this.mapTop;
        localMaps[this.map.id].gridLeft = this.gridLeft;
        localMaps[this.map.id].gridTop = this.gridTop;
        localMaps[this.map.id].mapZoom = this.mapZoom;

        localStorage.maps = JSON.stringify(localMaps);
      }
    }, 400),
    startDragging(event) {
      this.disableGhost(event);
      this.lastMouseLeft = event.clientX;
      this.lastMouseTop = event.clientY;
      this.dragging = true;
    },
    dragHandler(event) {
      var offsetX = event.clientX - this.lastMouseLeft,
        offsetY = event.clientY - this.lastMouseTop;

      if (this.dragging) {
        this.updateMapPosition(offsetX, offsetY);
        this.saveMapPositioning();
      }

      this.lastMouseLeft = event.clientX;
      this.lastMouseTop = event.clientY;
    },
    stopDragging(event) {
      var offsetX = event.clientX - this.lastMouseLeft,
        offsetY = event.clientY - this.lastMouseTop;

      this.dragging = false;
      this.updateMapPosition(offsetX, offsetY);
    },
    updateMapPosition(x, y) {
      if (x !== 0 && Math.abs(x) < 100) this.mapLeft += x;
      if (y !== 0 && Math.abs(y) < 100) this.mapTop += y;
    },
    scrollHandler(event) {
      var delta = event.deltaY / 8;

      if (this.resizingGrid) {
        this.scrollGrid(delta);
      } else {
        this.scrollMap(delta);
      }

      this.saveMapPositioning();
    },
    scrollGrid(delta) {
      this.map.baseGrid -= (delta / 100);
    },
    scrollMap(delta) {
      if (delta > 0) {
        this.mapZoom = Math.max(this.mapZoom - delta, 0);
      } else {
        this.mapZoom = Math.min(this.mapZoom - delta, 100);
      }
    },
    centerMap() {
      this.mapLeft = 0;
      this.mapTop = 0;
      this.lastMouseLeft = 0;
      this.lastMouseTop = 0;
    },
    toggleGrid() {
      // TODO publish update when saving grid scale
      this.resizingGrid = !this.resizingGrid;
    },
    addMyToken() {
      var self = this,
        deferred = q.defer(),
        mapId = self.map.id,
        token = {
          id: self.user.id,
          type: 'player',
          image: self.user.config.avatar,
          x: 0, // TODO need to calculate the best place based on other tokens
          y: 0  // TODO need to calculate the best place based on other tokens
        };

      self.gameService.addMapToken({ mapId, token })
        .fail(function (reason) {
          self.$emit('error', reason.err);
        })
        .done(function () {
          deferred.resolve();
        });

      return deferred.promise;
    },
    disableGhost(event) {
      var dragImg = document.createElement("img");

      dragImg.src = 'https://s3.amazonaws.com/ssdcgametable/site_structure/transparent-pixel.png';
      event.dataTransfer.setDragImage(dragImg, 0, 0);
    }
  }
};
