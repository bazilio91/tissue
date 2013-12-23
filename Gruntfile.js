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
                test: {
                    options: {
                        cwd: './app',
                        isDevelopment: true
                    }
                },
                build: {
                    options: {
                        cwd: './.tmp',
                        isDevelopment: false
                    }
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
                    "replace": {
                        "window": {
                            "toolbar": false
                        }
                    }
                },
                "build": {
                    "files": [
                        {
                            "src": ".tmp/package.json",
                            "dest": ".tmp/package.json"
                        }
                    ]
                }
            },
            shell: {
                dmg: {
                    command: 'hdiutil create ./webkitbuilds/releases/tissue/mac/Tissue.dmg -srcfolder ./webkitbuilds/releases/tissue/mac/ -ov'
                }
            },
            mochaTest: {
                test: {
                    options: {
                        reporter: 'spec',
                        // Require blanket wrapper here to instrument other required
                        // files on the fly.
                        //
                        // NB. We cannot require blanket directly as it
                        // detects that we are not running mocha cli and loads differently.
                        //
                        // NNB. As mocha is 'clever' enough to only run the tests once for
                        // each file the following coverage task does not actually run any
                        // tests which is why the coverage instrumentation has to be done here
                        require: 'blanket'
                    },
                    src: ['test/*.js']
                },
                coverage: {
                    options: {
                        reporter: 'html-cov',
                        // use the quiet flag to suppress the mocha console output
                        quiet: true,
                        // specify a destination file to capture the mocha
                        // output (the quiet option does not suppress this)
                        captureFile: 'coverage.html'
                    },
                    src: ['test/*.js']
                },
                travis: {
                    options: {
                        reporter: 'travis-cov'
                    }
                },
                src: ['test/*.js']
            }
        }

    );

// These plugins provide necessary tasks.
// Default task.
    grunt.registerTask('default', ['jshint', 'qunit']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('build', [
        'clean:build',
        'copy:build',
        'json-replace:build',
        'install-dependencies:build',
        'nodewebkit',
        'shell:dmg'
    ]);

    grunt.registerTask('test', [
        'install-dependencies:test',
        'mochaTest'
    ]);

    grunt.registerTask('agent', function () {
        var Agent = require('./app/scripts/agent'),
            agent = new Agent('http://localhost:20001');
        agent.listen();
        this.async();
    });
};
