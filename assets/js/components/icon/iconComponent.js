
var iconTemplate = require('./iconTemplate.html');

module.exports = {
  template: iconTemplate,
  props: ['name','tooltip'],
  computed: {
    iconClass() {
      var classObj = {
        'icon-image': true
      };

      classObj[this.name] = true;

      return classObj;
    },
    iconId() {
      return `#icon-${this.name}`;
    }
  }
};
