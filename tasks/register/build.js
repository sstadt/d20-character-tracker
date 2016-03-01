module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:dev',
    'sass:dev',
    'browserify',
    'sails-linker:dev',
    'copy:dev'
  ]);
};
