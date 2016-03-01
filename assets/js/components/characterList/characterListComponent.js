define([
  'text!./characterListTemplate.html'
], function (characterListTemplate) {

  return {
    template: characterListTemplate,
    props: {
      characters: {
        type: Array,
        required: true,
        twoWay: true
      }
    }
  };

});