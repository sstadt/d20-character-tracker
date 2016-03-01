module.exports = function (grunt) {
  grunt.registerTask('buildProd', [
    'clean:dev',
    'sass:dev',
    'browserify',
    'sails-linker:prod',
    'copy:dev'
  ]);
};
