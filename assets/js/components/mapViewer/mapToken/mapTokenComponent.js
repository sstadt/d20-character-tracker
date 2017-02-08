
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');

module.exports = {
  template: require('./mapTokenTemplate.html'),
  props: {
    game: {
      type: String,
      required: true
    },
    map: {
      type: String,
      required: true
    },
    token: {
      type: Object,
      required: true
    },
    gridSize: {
      type: Number,
      required: true
    },
    mapScale: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tokenSize: 50,
      xPos: 0,
      yPos: 0,
      lastMouseLeft: 0,
      lastMouseTop: 0,
      dragging: false,
      canvasWidth: 0,
      canvasHeight: 0,
      gameService: undefined
    };
  },
  computed: {
    backgroundImage() {
      return (this.token.image && this.token.image !== '') ? `url(${this.token.image})` : 'none';
    },
    left() {
      return `${this.xPos}px`;
    },
    top() {
      return `${this.yPos}px`;
    },
    healthBorder() {
      var color = (this.token.type === 'player') ? 'green' : 'orange';

      return `2px solid ${color}`;
    }
  },
  watch: {
    token(newToken, oldToken) {
      if (!_.eq(newToken, oldtoken)) {
        this.updatePosition();
      }
    }
  },
  created() {
    var self = this;

    self.updatePosition();

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game,
        mapId: self.map
      }
    });
  },
  methods: {
    updatePosition() {
      this.xPos = this.token.x;
      this.yPos = this.token.y;
    },
    startDragging(event) {
      this.disableGhost(event);
      this.lastMouseLeft = event.clientX;
      this.lastMouseTop = event.clientY;

      this.canvasWidth = event.target.parentNode.parentNode.offsetWidth;
      this.canvasHeight = event.target.parentNode.parentNode.offsetHeight;

      this.dragging = true;
    },
    dragHandler(event) {
      var offsetX = event.clientX - this.lastMouseLeft,
        offsetY = event.clientY - this.lastMouseTop;

      this.updateTokenPosition(offsetX, offsetY);

      this.lastMouseLeft = event.clientX;
      this.lastMouseTop = event.clientY;
    },
    stopDragging(event) {
      var self = this,
        deferred = q.defer(),
        offsetX = event.clientX - self.lastMouseLeft,
        offsetY = event.clientY - self.lastMouseTop;

      self.dragging = false;

      self.updateTokenPosition(offsetX, offsetY);
      self.validatePosition();

      self.gameService.moveMapToken({ x: self.xPos, y: self.yPos })
        .fail(function (reason) {
          this.$emit('error', reason.err);
        })
        .done(function () {
          deferred.resolve();
        });

      return deferred.promise;
    },
    updateTokenPosition(x, y) {
      if (x !== 0 && Math.abs(x) < 100) this.xPos += (x / this.mapScale);
      if (y !== 0 && Math.abs(y) < 100) this.yPos += (y / this.mapScale);
    },
    validatePosition() {
      var currentSize = this.tokenSize * this.gridSize,
        maxX = this.canvasWidth - currentSize,
        maxY = this.canvasHeight - currentSize;

      if (this.xPos < 0) this.xPos = 0;
      if (this.yPos < 0) this.yPos = 0;
      if (this.xPos > maxX) this.xPos = maxX;
      if (this.yPos > maxY) this.yPos = maxY;
    },
    disableGhost(event) {
      var dragImg = document.createElement("img");

      dragImg.src = 'https://s3.amazonaws.com/ssdcgametable/site_structure/transparent-pixel.png';
      event.dataTransfer.setDragImage(dragImg, 0, 0);
    }
  }
};
