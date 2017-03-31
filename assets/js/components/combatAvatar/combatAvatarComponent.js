
var config = require('../../lib/config.js');

function getRotation(percent) {
  var currentRotation = Math.round(percent * 180);
  return Math.min(Math.max(currentRotation, 0), 180);
}

module.exports = {
  template: require('./combatAvatarTemplate.html'),
  props: {
    name: {
      type: String,
      required: true
    },
    totalHealth: {
      type: Number,
      required: true
    },
    currentHealth: {
      type: Number,
      required: true
    },
    totalStrain: {
      type: Number,
      default: 0
    },
    currentStrain: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      defaultsTo: config.defaultAvatar
    },
    size: {
      type: String,
      default: 84
    }
  },
  computed: {
    avatarPx() {
      return `${this.size}px`;
    },
    avatarSrc() {
      return `url(${this.image})`;
    },
    healthPercent() {
      return this.currentHealth / this.totalHealth;
    },
    strainPercent() {
      return this.currentStrain / this.totalStrain;
    },
    healthRotation() {
      var rotation = getRotation(this.healthPercent);
      return `rotate(-${rotation}deg)`;
    },
    strainRotation() {
      var rotation = getRotation(this.strainPercent);
      return `rotate(${rotation}deg)`;
    }
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
