
define([
  'text!./tabTemplate.html'
], function (tabTemplate) {

  return {
    template: tabTemplate,
    props: {
      heading: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        index: 0,
        show: false
      };
    },
    computed: {
      show: function () {
        return (this.$parent.active == this.index);
      }
    },
    created: function () {
    },
    ready: function () {
      for (var index in this.$parent.$children) {
        if (this.$parent.$children[index].$el == this.$el) {
          this.index = index;
          this.$parent.renderData.push({
            heading: this.heading,
            disabled: this.disabled,
            active: false
          });
          break;
        }
      }
    }
  };

});
