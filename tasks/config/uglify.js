
module.exports = function (grunt) {

  grunt.config.set('uglify', {
    prod: {
      files: [{
        expand: true,
        cwd: '.tmp/public/js/',
        src: ['index.js'],
        dest: '.tmp/public/js/',
        ext: '.min.js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
