module.exports = function(grunt) {
  var gettingStarted = grunt.file.read('docs/getting-started.html');

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
      packages: {
        options: {
          remove: ['#sidepanel-classes', '#main-package-name', '#docs-main']
        },
        src: 'docs/site/index.html',
        dest: 'docs/site/packages.html'
      },
      index: {
        options: {
          remove: ['section#main'],
          append: {selector:'body',html:gettingStarted},
        },
        src: 'docs/site/index.html'
      }
    }
  });


  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-dom-munger');

  grunt.registerTask('default', 'Generate Docs!', function() {

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

    grunt.task.run('dom_munger:packages');

    grunt.task.run('dom_munger:index');


  });

};