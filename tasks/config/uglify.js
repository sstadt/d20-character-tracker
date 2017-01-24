
module.exports = function (grunt) {

  grunt.config.set('uglify', {
    prod: {
      options: {
        mangle: false
      },
      files: [{
        expand: true,
        cwd: '.tmp/public/js/',
        src: ['*.js'],
        dest: '.tmp/public/js/',
        ext: '.min.js'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
