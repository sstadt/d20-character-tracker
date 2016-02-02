module.exports = function(grunt) {

  var parentArg = grunt.option('parent'),
    name = grunt.option('name'),
    parent = parentArg ? parentArg + '/' : '',
    componentPath = 'assets/js/lib/components/' + parent + name + '/',
    files = {};

  files[componentPath + '_' + name + '.scss'] = ['tasks/templates/componentTemplate/_component.scss.tpl'];
  files[componentPath + name + '.js'] = ['tasks/templates/componentTemplate/component.js.tpl'];
  files[componentPath + name + '.Spec.js'] = ['tasks/templates/componentTemplate/component.Spec.js.tpl'];
  files[componentPath + name + 'Component.js'] = ['tasks/templates/componentTemplate/componentComponent.js.tpl'];
  files[componentPath + name + 'Template.html'] = ['tasks/templates/componentTemplate/componentTemplate.html.tpl'];

  grunt.config.set('template', {
    component: {
      options: {
        data: {
          name: name,
          path: parentArg ? '/' + parentArg : ''
        }
      },
      files: files
    }
  });

  grunt.loadNpmTasks('grunt-template');

};