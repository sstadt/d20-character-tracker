
module.exports = function (grunt) {

  grunt.registerTask('localjs', function () {
    if (!grunt.file.exists('config/local.js')) {
      grunt.task.run(['template:dev_localjs']);
    }
  });
};
