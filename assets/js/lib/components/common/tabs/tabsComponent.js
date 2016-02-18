
define([
  'text!./tabsTemplate.html'
], function (tabsTemplate) {

  return {
    template: tabsTemplate,
    props: {
      active: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        renderData: []
      };
    },
    methods: {
      handleTabListClick: function (index, el) {
        if (!el.disabled) this.active = index;

        for (var i = 0, j = this.renderData.length; i < j; i++) {
          this.renderData[i].active = (i == index);
        }
      }
    }
  };

});
