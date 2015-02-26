module.exports = function(grunt) {

  grunt.initConfig({
    folder_list : {
      options : {
        files:  false,
        folders: true
      },
      files : {
        'tmp/fixtures.json': ['packages/**']
      }
    },
    shell: {
      makeSite: {
        command: "rm -rf docs/site; mkdir docs/site"
      },
      makeDocs: {
        command: function (packageName) {
          return ['cd packages/'+packageName, 'ember ember-cli-yuidoc'].join('&&');
        }
      },
      copyDocs: {
        command: function (packageName) {
          return 'cp -r packages/'+packageName+'/docs docs/site/'+packageName;
        }
      },
      copyAssets: {
        command: function () {
          return 'cp -r docs/site/core/assets docs/site/assets';
        }
      },
      copyIndex: {
        command: function () {
          return 'cp docs/site/core/index.html docs/site/index.html';
        }
      }
    },
    dom_munger: {
      your_target: {
        options: {
          remove: ['#sidepanel-classes', '#main-package-name']
        },
        src: 'docs/site/index.html'
      }
    }
  });


  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-dom-munger');

  grunt.registerTask('default', 'Log some stuff.', function() {

    var packageNames = [];
    grunt.file.expand('packages/*').forEach(function(path) {
      packageNames.push(path.split('/')[1]);
    });

    grunt.task.run('shell:makeSite');

    packageNames.forEach(function(packageName) {
      grunt.task.run('shell:makeDocs:'+packageName);
    });

    packageNames.forEach(function(packageName) {
      grunt.task.run('shell:copyDocs:'+packageName);
    });

    grunt.task.run('shell:copyAssets');

    grunt.task.run('shell:copyIndex');

    grunt.task.run('dom_munger:your_target');


  });

};