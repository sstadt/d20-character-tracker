module.exports = function (grunt) {
  grunt.registerTask('test', [
    'browserify:vendor',
    'karma'
  ]);
};
