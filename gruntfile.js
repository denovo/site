module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    // we store the grunt-aws.json outside of our repo so that it never gets pushed to git
    aws: grunt.file.readJSON('grunt-aws.json'), // Read the file

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'eu-west-1',
        uploadConcurrency: 5,
         // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      staging: {
        options: {
          bucket: 'ual-staging',
          differential: true, // Only uploads the files that have changed
          params: {
            ContentEncoding: 'gzip',
            CacheControl: '30000000000'  // how many days do we want to set this too?
          }
        },
        
        files: [
          {expand: true, cwd: '_site/assets/img', src: ['**'], dest: 'assets/img/', action: 'upload'},
          {expand: true, cwd: '_site/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
          {expand: true, cwd: '_site/assets/js', src: ['script-min.js'], dest: 'assets/js/', action: 'upload'},
        ]
      },

      live: {
        options: {
          bucket: 'arts-live',
          differential: true, // Only uploads the files that have changed
          params: {
            ContentEncoding: 'gzip',
            CacheControl: '30000000000'  // how many days do we want to set this too?
          }
        },
        
        files: [
          {expand: true, cwd: '_site/assets/img', src: ['**'], dest: 'assets/img/', action: 'upload'},
          {expand: true, cwd: '_site/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
          // {expand: true, cwd: '_site/assets/fonts', src: ['**'], dest: 'assets/fonts/', action: 'upload'},
          {expand: true, cwd: '_site/assets/js', src: ['script-min.js'], dest: 'assets/js/', action: 'upload'},
        ]
      },
    },

    // invalidate cloudfront (clear cache) 
    cloudfront_clear: {
      invalidateIndex: {
        resourcePaths: ["/assets/", "/assets"],
        secret_key: "<%= aws.AWSSecretKey %>",
        access_key: "<%= aws.AWSAccessKeyId %>",
        dist: "<%= aws.AWSLive %>"
      }
    },

    

    compass: {
      production: {
        options: {
          config: 'config_live.rb',
          force: true
        }
      },

      local: {
        options: {
          config: 'config_local.rb',
          force: true
        }
      }
    },

    jshint: {
      // define the files to lint
      files: ['assets/js/script.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    concat: {
      options: {
        separator: '',
      },

    dist: {
        src: ['assets/js/libs/fastclick.js', 'assets/js/libs/jquery.review.js', 'assets/js/libs/megamenu_plugins.js', 'assets/js/libs/megamenu.js', 'assets/js/script.js'],
        dest: 'temp/combined.js',
      },
    },

    uglify: {
      options: {
        mangle: false,  // mangle will not change/minify variable and function names
        report: 'gzip',
        // the banner that is inserted at the top of the output
        banner: '/*!Updated: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },

      my_target: {
        files: {
          'assets/js/script-min.js': ['temp/combined.js']

        }
      },

      audio: {
        files: {
          'assets/js/libs/audio-min.js': ['assets/js/libs/audioplayer.js']
        }
      }
    },

    // terminal commands to execute with grunt
    exec: {
        build: {
          cmd: 'rm -rf _site/; jekyll build --destination _site/',
        },
        buildlocal: {
          cmd: 'rm -rf _site/; jekyll build --destination _site/ --config _config_local.yml',
        }


    },
  
    // copy /style-guide to /download folder
    copy: {
      style_guide: {
        src: '_site/style-guide',
        dest: '_site/download/style-guide/',
      },

      minified_assets: {
        files: [
          {expand: true, flatten: true, src: ['temp/js/**'], dest: '_site/assets/js/', filter: 'isFile'}, // flattens results to a single level
          {expand: true, flatten: true, src: ['temp/css/**'], dest: '_site/assets/css/', filter: 'isFile'}
        ]
      },

      minified_fonts: {
        files: [
          {expand: true, flatten: true, src: ['temp/fonts/**'], dest: '_site/assets/fonts/', filter: 'isFile'}
        ]
      }
    },

    compress: {
      main: {
        options: {
          archive: 'ual-bootstrap.zip'
        },
        files: [
          {src: ['download/**'], dest: ''}
        ]
      },
      css: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, flatten: true, src: ['_site/assets/css/*.css'], dest: 'temp/css/', ext: '.css'}
        ]
      },

      libs: {
         options: {
          mode: 'gzip'
        },
        files: [
          {expand: true,  src: ['assets/js/libs/audio-min.js'], dest: 'gz', ext: '.js'}
        ]
      },

      js: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, flatten: true, src: ['_site/assets/js/script-min.js'], dest: 'temp/js/', ext: '.js'}
        ]
      },

      fonts: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, flatten: true, src: ['_site/assets/fonts/*.eot'], dest: 'temp/fonts/', ext: '.eot'},
          {expand: true, flatten: true, src: ['_site/assets/fonts/*.svg'], dest: 'temp/fonts/', ext: '.svg'},
          {expand: true, flatten: true, src: ['_site/assets/fonts/*.ttf'], dest: 'temp/fonts/', ext: '.ttf'},
          {expand: true, flatten: true, src: ['_site/assets/fonts/*.woff'], dest: 'temp/fonts/', ext: '.woff'}
        ]
      }
    },

    // cleanup temporary files after concat and build
    clean: {
      build: {
        src: ['temp', '_site/node_modules', '_site/temp', '_site/ual-beta.sublime-workspace', '_site/package.json', '_site/gruntfile.js','_site/prod_config.rb']
      }
    },

    // need to setup Amazon S3 sync here https://npmjs.org/package/grunt-s3-sync
    watch: {
      sass_js: {
        files: ['assets/styles/**/*.scss','assets/js/*.js'],
        tasks: ['compass:local',
                'concat:dist',
                'uglify',
                'clean:build',
                'exec:build',
                ]
      },
    }
  });

  // * Note
  // when running for the first time on your machine,
  // you need to run 'npm install' from inside the root /beta folder.
  // This will install all the plugins that you need for this project to your machine (see below)

  // load npmTasks as listed in package.json
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-cloudfront-clear');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-newer');

  // Register Grunt Tasks

  // default grunt watch task
  // To run type: 'grunt' 
  grunt.registerTask('default', 'watch:sass_js');

  // test Javascript (script.js)
  // To run type: 'grunt testjs'
  grunt.registerTask('testjs', 'newer:jshint');


  //compress script libraries
  grunt.registerTask('compress_libs', 'compress:libs');

  // build for production. 
  // To run type: 'grunt buildlive'
  grunt.registerTask('buildlive', ['compass:production',
                                    'concat:dist',
                                    'any-newer:uglify',
                                    'compress:main',
                                    'exec:build',
                                    'compress:css',
                                    'compress:js',
                                    'copy:minified_assets',
                                    'clean:build',
                                    'any-newer:aws_s3:live',
                                    'cloudfront_clear'
                                    ]);

  grunt.registerTask('buildstaging', ['compass:production',
                                    'concat:dist',
                                    'any-newer:uglify',
                                    'compress:main',
                                    'exec:build',
                                    'compress:css',
                                    'compress:js',
                                    'copy:minified_assets',
                                    'clean:build',
                                    'aws_s3:staging',
                                    'cloudfront_clear'
                                    ]);

  // build for local github 
  // To run type: 'grunt buildlocal'
  grunt.registerTask('buildlocal', ['newer:jshint',
                                    'compass:local',
                                    'exec:buildlocal',
                                    'clean:build'
                                    ]);
  // gzip fonts
  grunt.registerTask('gzipfonts', ['any-newer:compress:fonts',
                                   'copy:minified_fonts'
                                    ]);


  grunt.registerTask('compressaudiojs', ['uglify:audio', 'compress:libs']);
  

  // grunt task to push to gitHub 


};