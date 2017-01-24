
module.exports = function (grunt) {
  grunt.config.set('envify', {
    prod: {
      options: {
        env: {
          NODE_ENV: 'production'
        }
      },
      files: {
        '.tmp/public/js/vendor.js': ['.tmp/public/js/vendor-build.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-envify');
};
