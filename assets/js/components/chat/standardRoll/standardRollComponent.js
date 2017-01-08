
module.exports = {
  template: require('./standardRollTemplate.html'),
  props: {
    chatHandle: {
      type: String,
      required: true
    },
    message: {
      type: Object,
      required: true
    }
  }
};
