/**
 * Compiles Browserify Packages
 * ---------------------------------------------------------------
 */
module.exports = function (grunt) {

  grunt.config.set('browserify', {
    options: {
      browserifyOptions: {
        debug: true
      },
      watch: true,
      livereload: true
    },
    vendor: {
      options: {
        transform: ['stringify']
      },
      files: [{
        expand: true,
        cwd: 'assets/js/app',
        src: ['vendor.js'],
        dest: '.tmp/public/js/'
      }]
    },
    dev: {
      options: {
        transform: [
          'stringify',
          ['babelify', {
            presets: ['es2015'],
            ignore: 'vendor.js'
          }]
        ],
      },
      files: [{
        expand: true,
        cwd: 'assets/js/app',
        src: ['*.js', '!vendor.js'],
        dest: '.tmp/public/js/'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};
