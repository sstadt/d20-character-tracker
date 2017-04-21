
module.exports = function (grunt) {
  grunt.registerTask('dev', [
    'githooks:all',
    'clean:dev',
    'sass:dev',
    'browserify:vendor',
    'browserify:dev',
    'copy:dev',
    'json-replace:cache',
    'watch'
  ]);
};
