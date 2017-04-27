
var config = require('../../lib/config.js');

var storageService = require('../../services/storageService.js');

module.exports = {
  template: require('./draggablePanelTemplate.html'),
  props: {
    panelId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      left: 0,
      top: 0,
      lastMouseLeft: 0,
      lastMouseTop: 0,
      dragging: false
    };
  },
  computed: {
    storageKey() {
      return `${config.localStorageKeys.draggablePanel}-${this.panelId}`;
    }
  },
  created() {
    this.initPosition();
  },
  methods: {
    getStartingPosition() {
      var localPosition = storageService.getLocal(this.storageKey, { defaultsTo: {} }),
        defaultPosition = { top: 150, left: 150 };

      if (!_.isNumber(localPosition.top)) {
        localPosition.top = defaultPosition.top;
      }

      if (!_.isNumber(localPosition.left)) {
        localPosition.left = defaultPosition.left;
      }

      return localPosition || defaultPosition;
    },
    initPosition() {
      var savedPosition = this.getStartingPosition();

      this.left = savedPosition.left;
      this.top = savedPosition.top;
    },
    savePosition: _.debounce(function () {
      var position = { left: this.left, top: this.top };
      storageService.setLocal(this.storageKey, position);
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
        this.updatePosition(offsetX, offsetY);
        this.savePosition();
      }

      this.lastMouseLeft = event.clientX;
      this.lastMouseTop = event.clientY;
    },
    stopDragging(event) {
      var offsetX = event.clientX - this.lastMouseLeft,
        offsetY = event.clientY - this.lastMouseTop;

      this.dragging = false;
      this.updatePosition(offsetX, offsetY);
    },
    updatePosition(x, y) {
      if (x !== 0 && Math.abs(x) < 80) this.left += x;
      if (y !== 0 && Math.abs(y) < 80) this.top += y;
    },
    disableGhost(event) {
      var dragImg = document.createElement("img");

      dragImg.src = 'https://s3.amazonaws.com/ssdcgametable/site_structure/transparent-pixel.png';
      event.dataTransfer.setDragImage(dragImg, 0, 0);
    }
  }
};
