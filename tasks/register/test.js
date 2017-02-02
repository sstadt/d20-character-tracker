module.exports = function (grunt) {
  grunt.registerTask('test', [
    'browserify:vendorProd',
    'envify:prod',
    'clean:vendorProd',
    'karma'
  ]);
};
