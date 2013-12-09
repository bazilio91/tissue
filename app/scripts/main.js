requirejs.config({
    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        templates: {
            exports: 'JST'
        },
        underscore: {
            exports: '_'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        }

    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
        templates: 'templates'
    }
});
App = {};
define(['app'], function (App_) {
    App = App_;
    App.io = require('socket.io').listen(20001);

    var Agent = require('./scripts/agent/'),
        agent = new Agent('http://localhost:20001');
    App.io.server.once('listening', function () {
        agent.listen();
    });
    App.agent = agent;
    $(window).bind('beforeunload', function () {
        App.io.server.close();
        agent.client.disconnect();
    });
    App.start();
});

