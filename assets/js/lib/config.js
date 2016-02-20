
requirejs.config({

  urlArgs: "v=" + (new Date()).getTime(),

  paths: {
    // plugins
    'text'                   : 'vendor/requirejs-text/text',

    // app
    'constants'              : 'lib/constants',
    'component'              : 'lib/components',
    'class'                  : 'lib/classes',
    'util'                   : 'lib/util',
    'service'                : 'lib/services',

    // vendor
    'sails'                  : 'vendor/sails.io.js/dist/sails.io',
    'jquery'                 : 'vendor/jquery/dist/jquery',
    'lodash'                 : 'vendor/lodash/dist/lodash',
    'vue'                    : 'vendor/vue/dist/vue',
    'vue.min'                : 'vendor/vue/dist/vue.min',
    'marked'                 : 'vendor/marked/lib/marked',
    'moment'                 : 'vendor/moment/moment',
  },

});







