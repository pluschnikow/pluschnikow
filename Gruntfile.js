
// pluschnikow.de Grunt Configuration File

var globals= {
  port: 4000
};

module.exports = function( grunt ) {
  'use strict';

  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Global Parameters
    // Usage: <%= globals.param %>
    // --------------------------
    globals: globals,

    // Banner
    // Header Banner for Javascript & Style Files
    // --------------------------
    banner: '/*! \n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd, HH:MM:ss") %>\n' +
              ' *\n' +
              ' * (c) <%= pkg.author %> <%= grunt.template.today("yyyy") %>\n' +
              ' */\n',


    // Dev Workflow Tasks
    // --------------------------
    jshint: {
      options: {
        node: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: ['Gruntfile.js'], // 'models/**/*.js',
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'keystone.js',
        options: {
          // nodeArgs: ['--debug'],
          env: {
            PORT: '<%= globals.port %>',
            NODE_ENV: 'development'
          },
          // omit this property if you aren't serving HTML files and
          // don't want to open a browser tab on start
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:' + globals.port);
              }, 5000);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          },
          //tasks: ['watch:server']
          ignore: ['node_modules/**'],
          ext: 'js,coffee',
        }
      }
    },

    autoprefixer: {
        options: {
          browsers: ['last 1 version']
        },
        css: {
          src: [
            'public/css/style.css'
          ]
        }
    },

    less: {
      compiler: {
        options: {
          dumpLineNumbers: 'comments',
        },
        files: {
          'public/css/style.css': 'assets/less/base.less'
        }
      }
    },

    watch: {
      less: {
        files: 'assets/less/**/*.less',
        tasks: ['less', 'autoprefixer'],
        options: {
          atBegin: true
        }
      },
      js: {
        files: ['assets/js/*.js', 'assets/js/plugins/*.js'],
        tasks: ['concat'],
        options: {
          atBegin: true
        }
      },
      server: {
        files: ['.rebooted'],
      }
    },

    // @end dev workflow tasks


    // Build Tasks
    // --------------------------
    cssmin: {
      options: {
        banner: '/*! Stylesheets <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        report: 'min',
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.css'
        }
      }
    },

    uncss: {
      dist: {
        files: {
          'public/css/style.css': ['templates/views/index.html']
        }
      }
    },

    // Javascript Concat (based on `usemin` (temp.) configuration)
    concat: {
      dist: {
        files:[{
            dest: 'public/js/scripts.js',
            src: ['assets/js/*.js', 'assets/js/plugins/*.js']
        }]
      }
    },

    // Minfication & uglify (based on `usemin` (temp.) configuration)
    uglify: {
      options: {
        mangle: false,
        banner: '<%= banner %>',
        stripBanners: false,
        report: 'min'
      },
      dist: {
        files: [{
          dest: 'public/js/scripts.js',
          src: [ 'public/js/scripts.js' ]
        }]
      }
    }
  });


  // Register Tasks
  // (1) build: Build for Prod enviroment
  // (2) server: development workflow
  // (3) default (run `server` task)
  // --------------------------
  grunt.registerTask('build', [
    'less',
    'autoprefixer',
    //'cssmin',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('server', [
    'jshint:all',
    'concurrent'
  ]);

  grunt.registerTask('dev', ['server']);
  grunt.registerTask('prod', ['jshint:all', 'build']);
  grunt.registerTask('uncss', ['uncss']);
  grunt.registerTask('default', ['dev']);

};