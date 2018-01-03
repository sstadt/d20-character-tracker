
Vue.directive('prevent-drag', {
  bind: function (el) {
    // TODO not working at all right now
    el.addEventListener('dragstart dragend', (e) => e.stopPropagation());
  }
});
