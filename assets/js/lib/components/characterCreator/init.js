define([
  'vue',
  './characterCreatorComponent'
], function (Vue, characterCreatorComponent) {
  console.log(new Vue(_.clone(characterCreatorComponent)));
  Vue.component('characterCreator', characterCreatorComponent);
  
});