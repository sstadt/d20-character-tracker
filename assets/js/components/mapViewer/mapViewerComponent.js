
module.exports = {
  template: require('./mapViewerTemplate.html'),
  data() {
    return {
      map: {
        id: 1,
        image: 'https://s3.amazonaws.com/ssdcgametable/site_structure/sw_galaxymap.jpg',
        tokens: []
      },
      left: 0,
      top: 0,
      lastLeft: 0,
      lastTop: 0,
      mapZoom: 20, // 100% start
      showGrid: false,
      dragging: false
    };
  },
  computed: {
    mapScale() {
      var factor = ((this.mapZoom / 100) * 490 + 10) / 100;
      return `translateX(-50%) translateY(-50%) scale(${factor}, ${factor})`;
    },
  },
  methods: {
    startDragging(event) {
      this.lastLeft = event.clientX;
      this.lastTop = event.clientY;
      this.dragging = true;
    },
    dragHandler(event) {
      var offsetX = event.clientX - this.lastLeft,
        offsetY = event.clientY - this.lastTop;

      if (this.dragging && Math.abs(offsetX) < 100) {
        this.updatePosition(offsetX, offsetY);
      }
    },
    stopDragging(event) {
      var offsetX = event.clientX - this.lastLeft,
        offsetY = event.clientY - this.lastTop;

      this.dragging = false;

      this.updatePosition(offsetX, offsetY);
    },
    updatePosition(x, y) {
      if (x !== 0) this.left += x;
      if (y !== 0) this.top += y;
      this.lastLeft = event.clientX;
      this.lastTop = event.clientY;
    },
    scrollHandler(event) {
      var delta = event.deltaY / 8;

      if (delta > 0) {
        this.mapZoom = Math.min(this.mapZoom + delta, 100);
      } else {
        this.mapZoom = Math.max(this.mapZoom + delta, 0);
      }
    },
    centerMap() {
      this.left = 0;
      this.top = 0;
      this.lastLeft = 0;
      this.lastTop = 0;
    },
    toggleGrid() {
      this.showGrid = !this.showGrid;
    }
  }
};
