
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
      default: config.defaultAvatar
    },
    size: {
      type: Number,
      default: 84
    },
    showAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hovering: false,
      strainColor: config.colors.strain
    };
  },
  computed: {
    menuSize() {
      return Math.round(this.size * 0.8);
    },
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
    healthColor() {
      var color = 'green';

      if (this.healthPercent <= 0.1) {
        color = config.colors.healthFull;
      } else if (this.healthPercent <= 0.5) {
        color = config.colors.healthWarning;
      } else if (this.healthPercent <= 0.75) {
        color = config.colors.healthDanger;
      } else {
        color = config.colors.healthCritical;
      }

      return color;
    },
    strainRotation() {
      var rotation = getRotation(this.strainPercent);
      return `rotate(${rotation}deg)`;
    }
  },
  methods: {
    enter() {
      this.hovering = true;
    },
    leave() {
      this.hovering = false;
    },
    heal(type) {
      this.$emit('heal', type);
    },
    damage(type) {
      this.$emit('damage', type);
    },
    showCard() {
      this.$emit('show-card');
    }
  }
};
