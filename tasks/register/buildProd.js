module.exports = function (grunt) {
  grunt.registerTask('buildProd', [
    'clean:dev',
    'sass:dev',
    'browserify:vendorProd',
    'browserify:dev',
    'envify:prod',
    'clean:vendorProd',
    'uglify:prod',
    'cssmin',
    // 'sails-linker:prodJs',
    // 'sails-linker:prodCss',
    'copy:dev'
  ]);
};
