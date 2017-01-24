module.exports = function (grunt) {
  grunt.registerTask('buildProd', [
    'clean:dev',
    'sass:dev',
    'browserify:vendor',
    'browserify:dev',
    'uglify:prod',
    'cssmin',
    // 'sails-linker:prodJs',
    // 'sails-linker:prodCss',
    'copy:dev'
  ]);
};
