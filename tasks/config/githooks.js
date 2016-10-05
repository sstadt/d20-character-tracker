
module.exports = function (grunt) {

  grunt.config.set('githooks', {
    all: {
      'pre-commit': 'test'
    }
  });

 grunt.loadNpmTasks('grunt-githooks');
};
