module.exports = function (grunt) {
  grunt.registerTask('buildProd', [
    'clean:dev',
    'sass:dev',
    'browserify:vendor',
    'browserify:dev',
    'sails-linker:prod',
    'uglify:prod',
    'copy:dev'
  ]);
};
