/*global module:false, require*/
module.exports = function (grunt) {
    'use strict';
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
        nodewebkit: {
            options: {
                build_dir: './webkitbuilds', // Where the build version of my node-webkit app is saved
                mac: true, // We want to build it for mac
                win: true, // We want to build it for win
                linux32: true, // We don't need linux32
                linux64: true, // We don't need linux64
                version: '0.8.2',
                mac_icns: '.tmp/styles/icons/icon.icns'
            },
            // ResHacker.exe -addoverwrite "Project.exe", "Project.exe", "ProgramIcon.ico", ICONGROUP, MAINICON, 0
            src: ['./.tmp/**/*'] // Your node-wekit app
        },
        'install-dependencies': {
            options: {
                cwd: './.tmp',
                isDevelopment: false
            }
        },
        copy: {
            build: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['**'], cwd: 'app', dest: '.tmp/'}
                ]
            }
        },
        clean: {
            build: {
                src: ['.tmp']
            }
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
        },
        "json-replace": {
            "options": {
                space: "    ",
                "replace" : {
                    "window" : {
                        "toolbar" : false
                    }
                }
            },
            "build": {
                "files" : [{
                    "src" : ".tmp/package.json",
                    "dest" : ".tmp/package.json"
                }]
            }
        },
        shell: {
            dmg: {
                command: 'hdiutil create ./webkitbuilds/releases/tissue/mac/Tissue.dmg -srcfolder ./webkitbuilds/releases/tissue/mac/ -ov'
            }
        }
    });

    // These plugins provide necessary tasks.
    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('build', [
        'clean:build',
        'copy:build',
        'json-replace:build',
        'install-dependencies',
        'nodewebkit',
        'shell:dmg'
    ]);
};
