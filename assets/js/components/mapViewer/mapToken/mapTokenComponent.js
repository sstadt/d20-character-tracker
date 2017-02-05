
module.exports = {
  template: require('./mapTokenTemplate.html'),
  props: {
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
      xPos: 0,
      yPos: 0,
      lastMouseLeft: 0,
      lastMouseTop: 0,
      dragging: false
    };
  },
  computed: {
    backgroundImage() {
      return (this.token.image && this.token.image !== '') ? `url(${this.token.image})` : 'none';
    },
    tokenSize() {
      var size = this.gridSize * 0.5;
      return `${size}px`;
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
    this.updatePosition();
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
      var offsetX = event.clientX - this.lastMouseLeft,
        offsetY = event.clientY - this.lastMouseTop;

      this.dragging = false;

      this.updateTokenPosition(offsetX, offsetY);
      // TODO publish token position update
    },
    updateTokenPosition(x, y) {
      if (x !== 0 && Math.abs(x) < 100) this.xPos += (x / this.mapScale);
      if (y !== 0 && Math.abs(y) < 100) this.yPos += (y / this.mapScale);
    },
    disableGhost(event) {
      var dragImg = document.createElement("img");

      dragImg.src = 'https://s3.amazonaws.com/ssdcgametable/site_structure/transparent-pixel.png';
      event.dataTransfer.setDragImage(dragImg, 0, 0);
    }
  }
};
