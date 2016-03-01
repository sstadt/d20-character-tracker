/**
 * Compiles Browserify Packages
 * ---------------------------------------------------------------
 */
module.exports = function (grunt) {

  grunt.config.set('browserify', {
    dev: {
      options: {
        browserifyOptions: {
          debug: true
        },
        transform: ['stringify']
      },
      files: [
        {
          expand: true,
          cwd: 'assets/js/bundles',
          src: ['*.js'],
          dest: '.tmp/public/js/'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};
