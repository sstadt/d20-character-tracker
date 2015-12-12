define([
  'vue',
  'text!./characterListTemplate.html'
], function (Vue, characterListTemplate) {

  Vue.component('characterList', {
    template: characterListTemplate,
    props: {
      greeting: {
        type: String,
        required: true,
        twoWay: true
      }
    }
  });

});