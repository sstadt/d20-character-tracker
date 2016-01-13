/**
 * Run Karma test suite
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to run the project's unit tests
 *
 * For usage docs see:
 *    https://github.com/karma-runner/grunt-karma
 */
module.exports = function (grunt) {

  grunt.config.set('karma', {
    unit: {
      configFile: 'karma.conf.js',
      singleRun: true
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};
