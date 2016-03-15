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
      transform: ['stringify'],
      watch: true,
      livereload: true
    },
    vendor: {
      files: [{
        expand: true,
        cwd: 'assets/js/app',
        src: ['vendor.js'],
        dest: '.tmp/public/js/'
      }]
    },
    dev: {
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
