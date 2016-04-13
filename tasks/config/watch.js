/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function (grunt) {

  grunt.config.set('watch', {
    options: {
      livereload: 9090,
    },
    views: {
      files: ['views/**/*']
    },
    assets: {
      files: ['assets/images/**/*'],
      tasks: ['copy:dev']
    },
    js: {
      files: ['.tmp/public/js/*'],
      tasks: ['json-replace:cache']
    },
    sass: {
      files: ['assets/**/*.scss'],
      tasks: ['sass:dev', 'json-replace:cache']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
