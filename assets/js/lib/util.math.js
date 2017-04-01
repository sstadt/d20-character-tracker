

module.exports = {

  subtractDegrees(from, by) {
    return (from - by < 0) ? 360 - (by - from) : from - by;
  },

  addDegrees(from, by) {
    return (from + by > 360) ? by - (360 - from) : from + by;
  },

  radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  },

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

};
