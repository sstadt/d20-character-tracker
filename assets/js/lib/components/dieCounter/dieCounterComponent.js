
define([
  'text!./dieCounterTemplate.html'
], function (dieCounterTemplate) {

  return {
    template: dieCounterTemplate,
    props: {
      count: {
        type: Number,
        required: true,
        twoWay: true
      },
      die: {
        type: String,
        required: true
      }
    },
    computed: {
      dieType: function () {
        return 'die-' + this.die;
      }
    },
    methods: {
      increment: function () {
        this.count++;
      },
      decrement: function () {
        if (this.count > 0) {
          this.count--;
        }
      }
    }
  };

});
