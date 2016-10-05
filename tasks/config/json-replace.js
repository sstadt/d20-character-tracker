
module.exports = function (grunt) {

  var currVersion = grunt.file.readJSON('build.json').build;

  grunt.config.set('json-replace', {
    cache: {
      options: {
        replace: {
          build: ++currVersion
        }
      },
      files: [{
        src: 'build.json',
        dest: 'build.json'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-json-replace');
};
