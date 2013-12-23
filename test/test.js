/*global describe, require, it, before, after, app*/
var blanket = require("blanket")({
    /* options are passed as an argument object to the require statement */
    "pattern": ["app/scripts/", "app/models", "app/app.js", "app/server.js",
    "app/utils.js"]
});

var assert = require('assert'),
    utils = require('./../app/utils'),
    config = utils.getConfig(),
    requirejs = require('requirejs'),
    App = require('./../app/app');

// set port to different value from app to prevent EADDRINUSE
config.server.port = 20001;
config.server.host = '0.0.0.0';
config.server.enabled = true;

describe('Array', function () {
    'use strict';
    before(function (done) {
        global.app = new App();
        app.start();
        app.enableServer();
        app.server.io.server.on('listening', done);
    });

    after(function () {
        app.stopServer();
    });

    describe('Initialization tests', function () {
        it('should start server', function () {
            assert(app.server.io.server._connectionKey
                .indexOf(config.server.host + ':' + config.server.port));
        });

        it('should start agent', function (done) {
            app.enableAgent();
            app.agent.client.on('connect', done);
        });
    });
});