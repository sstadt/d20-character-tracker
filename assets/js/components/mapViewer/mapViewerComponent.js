
module.exports = {
  template: require('./mapViewerTemplate.html'),
  data() {
    return {
      activeMap: 'https://s3.amazonaws.com/ssdcgametable/site_structure/sw_galaxymap.jpg',
      left: 0,
      top: 0,
      lastLeft: 0,
      lastTop: 0,
      mapZoom: 20, // 100% start
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
    updatePosition(x, y) {
      if (x !== 0) this.left += x;
      if (y !== 0) this.top += y;
      this.lastLeft = event.clientX;
      this.lastTop = event.clientY;
    },
    stopDragging(event) {
      var offsetX = event.clientX - this.lastLeft,
        offsetY = event.clientY - this.lastTop;

      this.dragging = false;

      this.updatePosition(offsetX, offsetY);
    }
  }
};
