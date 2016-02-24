

requirejs.config({

  urlArgs: "v=" + (new Date()).getTime(),

  paths: {
    // plugins
    'text'          : 'vendor/requirejs-text/text',

    // app
    'constants'     : 'lib/constants',
    'io'            : 'lib/io',
    'component'     : 'lib/components',
    'class'         : 'lib/classes',
    'util'          : 'lib/util',
    'service'       : 'lib/services',

    // vendor
    'sails.io'      : 'vendor/sails.io.js/sails.io',
    'socket.io'     : 'vendor/socket.io-client/socket.io',
    'jquery'        : 'vendor/jquery/dist/jquery',
    'lodash'        : 'vendor/lodash/dist/lodash',
    'vue'           : 'vendor/vue/dist/vue',
    'vue.min'       : 'vendor/vue/dist/vue.min',
    'marked'        : 'vendor/marked/lib/marked',
    'moment'        : 'vendor/moment/moment',

    // support
    'testComponent' : 'spec/testComponent',
  },

});

