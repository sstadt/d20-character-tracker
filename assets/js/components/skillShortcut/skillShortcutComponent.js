
module.exports = {
  template: require('./skillShortcutTemplate.html'),
  props: {
    name: {
      type: String,
      required: true
    },
    ranks: {
      type: Number,
      required: true
    },
    ability: {
      type: Number,
      required: true
    }
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
