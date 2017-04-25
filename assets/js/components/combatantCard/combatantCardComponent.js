
module.exports = {
  template: require('./combatantCardTemplate.html'),
  props: {
    combatant: {
      type: Object,
      // required: true
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};
