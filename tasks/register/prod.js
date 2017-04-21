
module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'clean:dev',
    'sass:dev',
    'browserify:vendorProd',
    'browserify:dev',
    'envify:prod',
    'clean:vendorProd',
    'uglify:prod',
    'cssmin',
    'copy:dev'
  ]);
};
