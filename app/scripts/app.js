var Agent = require('./scripts/agent');
define(['marionette', 'underscore', 'views/browser/BrowserListView', 'models/BrowserCollection'],
    function (Marionette, _, BrowserListView, BrowserCollection) {
        "use strict";
        var App = Marionette.Application.extend({
            io: null
        });

        App = new App();

        App.addRegions({
            list: "#sidebar-wrapper"
        });

        App.addInitializer(function (options) {
            // do useful stuff here

            var myView = new BrowserListView({collection: new BrowserCollection()});
            App.list.show(myView);
        });
        App.agent = null;
        App.serverUrl = null;
        App.enableAgent = function () {
            console.log(App.serverUrl);
            if (!App.agent) {
                console.log('new agent!');
                App.agent = new Agent(App.serverUrl);
            }

            App.agent.listen();
        };

        App.disableAgent = function () {
            console.log(App.agent);
            if (App.agent) {
                App.agent.client.disconnect();
            }
        };

        App.enableServer = function () {
            App.io = require('socket.io', {'log level': 0}).listen(20000);
            App.io.server.once('listening', function () {
                App.vent.trigger('server:active');
            });
        };

        App.disableServer = function () {
            App.io.server.close();
        };


        return App;
    });