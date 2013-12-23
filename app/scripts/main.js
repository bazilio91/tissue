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
        },
        'socket.io-client': {
            exports: 'io'
        }

    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        'ua-parser': '../bower_components/ua-parser-js/src/ua-parser.min',
        'socket.io-client': '../node_modules/socket.io-client/dist/socket.io',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
        templates: 'templates',
        app: '../app'
    }
});
if (main && typeof main === 'function') {
    main();
}

