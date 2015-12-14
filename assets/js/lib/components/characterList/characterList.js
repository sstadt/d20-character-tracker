define([
  'vue',
  'text!./characterList.html'
], function (Vue, characterListTemplate) {

  Vue.component('characterList', {
    template: characterListTemplate,
    props: {
      characters: {
        type: Array,
        required: true,
        twoWay: true
      }
    }
  });

});