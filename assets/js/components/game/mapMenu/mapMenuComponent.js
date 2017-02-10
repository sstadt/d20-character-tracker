
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');
var FieldSet = require('../../../classes/FieldSet.js');

var mapValidation = {
  name: {
    required: true
  },
  imageUrl: {
    required: true,
    pattern: 'imgurl'
  },
  shared: {}
};

module.exports = {
  template: require('./mapMenuTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true,
      saving: false
    }
  },
  data() {
    return {
      view: 'list',
      newMapForm: new FieldSet(mapValidation),
      editMapForm: new FieldSet(mapValidation)
    };
  },
  computed: {
    newMapImage() {
      // TODO need a default image for maps
      return (this.newMapForm.fields.imageUrl.hasErrors) ? '' : this.newMapForm.fields.imageUrl.value;
    },
  },
  methods: {
    setView(view) {
      this.view = view;
    },
    addMap() {
      console.log('add map');
    }
  }
};
