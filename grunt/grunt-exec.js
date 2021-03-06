// *--------------------------------------------------------------------------------------------------*\
//  Exec: (grunt-exec plugin)  -- A task to run terminal commands within a grunt task
// *--------------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('exec', {

        minifyjs: {
            cmd: 'rm -rf .temp/assets/js/script.min.js ; java -jar grunt/src/yuicompressor-2.4.8.jar --nomunge --preserve-semi .tmp/assets/js/script.js > .tmp/assets/js/script.min.js',
        },

        editPost: {
            cmd: function(filename) {
                  return 'sublime source/blog/posts/' + filename;
                }
        },
        editPrototype: {
            cmd: function(foldername) {
                  //return 'sublime source/prototypes/' + foldername + '/index.jade';
                  return 'open -a /Applications/Sublime Text.app "gruntfile.js"';
                }
        }

    });
    grunt.loadNpmTasks('grunt-exec');
};


