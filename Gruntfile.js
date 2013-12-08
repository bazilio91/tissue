/*global module:false*/
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            options: {
                livereload: true
            },

            js: {
                files: 'app/scripts/**/*.js'
            },
            html: {
                files: 'app/**/*.html'
            },
            less: {
                files: 'app/**/*.less'
            }
        }
    });

    // These plugins provide necessary tasks.
    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit']);
    grunt.registerTask('dev', ['watch']);
};
