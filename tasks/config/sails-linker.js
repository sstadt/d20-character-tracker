/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 *    https://github.com/Zolmeister/grunt-sails-linker
 *
 */

var pipeline = {
  css: [],
  js: [
    '.tmp/public/js/vendor.js'
  ]
};

var prodPipeline = {
  css: pipeline.css.map(function (file) {
    return file.replace('.css', '.min.css');
  }),
  js: pipeline.js.map(function (file) {
    return file.replace('.js', '.min.js');
  })
};

module.exports = function(grunt) {

  var cacheBust = grunt.file.readJSON('build.json').build;

  grunt.config.set('sails-linker', {

    devCss: {
      options: {
        startTag: '<!-- STYLES -->',
        endTag: '<!-- STYLES END -->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': pipeline.css,
        'views/**/*.html': pipeline.css,
        'views/**/*.ejs': pipeline.css
      }
    },

    prodCss: {
      options: {
        startTag: '<!-- STYLES -->',
        endTag: '<!-- STYLES END -->',
        fileTmpl: '<link rel="stylesheet" href="%s?v=' + cacheBust + '"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': prodPipeline.css,
        'views/**/*.html': prodPipeline.css,
        'views/**/*.ejs': prodPipeline.css
      }
    },

    devJs: {
      options: {
        startTag: '<!-- SCRIPT -->',
        endTag: '<!-- SCRIPT END -->',
        fileTmpl: '<script type="text/javascript" src="%s"></script>',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': pipeline.js,
        'views/**/*.html': pipeline.js,
        'views/**/*.ejs': pipeline.js
      }
    },

    prodJs: {
      options: {
        startTag: '<!-- SCRIPT -->',
        endTag: '<!-- SCRIPT END -->',
        fileTmpl: '<script type="text/javascript" src="%s?v=' + cacheBust + '"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': prodPipeline.js,
        'views/**/*.html': prodPipeline.js,
        'views/**/*.ejs': prodPipeline.js
      }
    },
  });

  grunt.loadNpmTasks('grunt-sails-linker');
};
