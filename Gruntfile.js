module.exports = function(grunt) {
  var packageNames = [];
  var currentPackage = "yolo";
  var guides = [];

  // Grunt Tasks
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-md2html');

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
      // Delete old version of the Site.
      makeSite: {
        command: "rm -rf docs/site; mkdir docs/site"
      },
      // Build each set of docs in each package directory.
      makeDocs: {
        command: function (packageName) {
          return ['cd packages/'+packageName, 'ember ember-cli-yuidoc'].join('&&');
        }
      },
      // Copy the newly built individual docs into the main docs folder.
      copyDocs: {
        command: function (packageName) {
          return 'cp -r packages/'+packageName+'/docs docs/site/'+packageName;
        }
      },
      // Use "Core" as the template for non-YUI pages.
      // Copy "Core" assets over.
      copyAssets: {
        command: function () {
          return 'cp -r docs/site/core/assets docs/site/assets';
        }
      },
      // Copy "Core" index.html over.
      copyIndex: {
        command: function () {
          return 'cp docs/site/core/index.html docs/site/index.html';
        }
      },
      copyGuidesTemplate: {
        command: function () {
          return 'cp docs/site/core/index.html docs/site/guide-template.html';
        }
      },
      deleteGuidesTemplate: {
        command: function () {
          return 'rm docs/site/guide-template.html';
        }
      }
    },
    dom_munger: {
      // Generate the "Packages" Page
      packages: {
        options: {
          remove: ['#sidebar-content', '#main-content'],
          callback: function($){
            $('#main-package-name h3').text('Packages');
            packageNames.forEach(function(packageName) {
              $("#docs-content").append("<a class='small-12 columns panel' href='http://spree-ember.com/"+packageName+"/index.html'><h3>ember-cli-spree-"+packageName+"</h3></a>");
            })
          }
        },
        src: 'docs/site/index.html',
        dest: 'docs/site/packages.html'
      },
      // Generate the Homepage
      index: {
        options: {
          remove: ['section#main'],
          callback: function($){
            $('header').addClass('homepage');
          }
        },
        src: 'docs/site/index.html'
      },
      sidebarTemplate: {
        options: {
          callback: function($) {
            $("ul#all-packages").empty();
            packageNames.forEach(function(packageName) {
              $("ul#all-packages").append("<li><a href='http://spree-ember.com/"+packageName+"/index.html'>"+packageName+"</a></li>");
            })
          }
        },
        src: 'docs/theme/partials/sidebar.handlebars'
      },
      guideTemplate: {
        options: {
          callback: function($){
            $("#sidebar-content h3").first().text("Guides");
            $("#sidebar-content ul").first().empty();

            guides.forEach(function(guideName) {
              var prettyName = guideName.split("-");
              prettyName.shift();
              if (prettyName.length > 1) {
                prettyName = prettyName.join(" ");
              }
              $("#sidebar-content ul").first().append("<li><a href='http://spree-ember.com/"+guideName+".html'>"+prettyName+"</a></li>");
            });

            $('#main-package-name h3').text('Guides');
            $('#main-content').text('{DOC}');
          }
        },
        src: 'docs/site/guide-template.html'
      }
    },
    md2html: {
      guides: {
        options: {
          layout: 'docs/site/guide-template.html'
        },
        files: [{
          expand: true,
          cwd: 'docs/guides',
          src: ['*.md'],
          dest: 'docs/site',
          ext: '.html'
        }]
      },

      // Need a better way to do this:
      auth: {
        options: {
          layout: 'docs/site/auth/index.html'
        },
        files: [{
          src: ['packages/auth/README.md'],
          dest: 'docs/site/auth/index.html'
        }]
      },
      checkouts: {
        options: {
          layout: 'docs/site/checkouts/index.html'
        },
        files: [{
          src: ['packages/checkouts/README.md'],
          dest: 'docs/site/checkouts/index.html'
        }]
      },
      core: {
        options: {
          layout: 'docs/site/core/index.html'
        },
        files: [{
          src: ['packages/core/README.md'],
          dest: 'docs/site/core/index.html'
        }]
      },
      frontend: {
        options: {
          layout: 'docs/site/frontend/index.html'
        },
        files: [{
          src: ['packages/frontend/README.md'],
          dest: 'docs/site/frontend/index.html'
        }]
      }
    }
  });




  grunt.registerTask('default', 'Generate Docs!', function() {

    grunt.task.run('shell:makeSite');

    // Prepare API Docs for Packages
    grunt.file.expand('packages/*').forEach(function(path) {
      packageNames.push(path.split('/')[1]);
    });

    // Setup API Section in Sidebar
    grunt.task.run('dom_munger:sidebarTemplate');

    packageNames.forEach(function(packageName) {
      grunt.task.run('shell:makeDocs:'+packageName);
      grunt.task.run('shell:copyDocs:'+packageName);
      grunt.task.run('md2html:'+packageName);
    });

    // Create Homepage and Packages Index
    grunt.task.run('shell:copyAssets');
    grunt.task.run('shell:copyIndex');
    grunt.task.run('dom_munger:packages');
    grunt.task.run('dom_munger:index');

    // Discover Guides
    grunt.file.expand('docs/guides/*').forEach(function(path) {
      guides.push(path.split('/')[2].split('.')[0]);
    });

    // Prepare the Guides Template
    grunt.task.run('shell:copyGuidesTemplate');
    grunt.task.run('dom_munger:guideTemplate');

    // Create Guide Files
    grunt.task.run('md2html:guides');
    grunt.task.run('shell:deleteGuidesTemplate');
  });
};