module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              // loose: 'all'
            }]
          ]
        },
        files: {
          // if the source file has an extension of es6 then
          // we change the name of the source file accordingly.
          // The result file's extension is always .js
          './public/js/app.js': ['./public/js/src/App.js']
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          './public/js/app.js': ['./public/js/app.js']
        }
      }
    },
    watch: {
      scripts: {
        files: './public/js/src/**/*.js',
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);
  //grunt.registerTask('build', ['browserify', 'uglify']);
  grunt.registerTask('build', ['browserify']); //todo for some reason uglify task do not work see why
};