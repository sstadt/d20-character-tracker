
module.exports = function (grunt) {

  grunt.config.set('cssmin', {
    target: {
      files: [{
        expand: true,
        cwd: '.tmp/public/styles/',
        src: ['style.css'],
        dest: '.tmp/public/styles/',
        ext: '.min.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
