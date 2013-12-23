var Agent = require('./scripts/agent'),
    utils = require('./utils'),
    config = utils.getConfig(),
    _ = require('lodash'),
    Backbone = require('backbone'),
    BrowserCollection = require('./models/BrowserCollection'),
    logan = require('logan');


/**
 * @class App
 */
module.exports = function () {
    "use strict";
    var App = {
        io: null,
        agent: null,
        serverUrl: null
    };

    App.start = function () {
        App.browsers = new BrowserCollection();
    };

    App.vent = _.extend({}, Backbone.Events);


    App.enableAgent = function () {
        if (!config.agent.enabled) {
            config.agent.enabled = true;
            utils.saveConfig();
        }

        if (!App.agent) {
            App.agent = new Agent('http://' + config.server.host + ':' + config.server.port);
        }

        App.agent.listen();
    };

    App.stopAgent = function () {
        if (App.agent) {
            App.agent.client.disconnect();
        }
    };

    App.disableAgent = function () {
        if (config.agent.enabled) {
            config.agent.enabled = false;
            utils.saveConfig();
        }

        App.stopAgent();
    };

    App.enableServer = function () {
        if (!config.server.enabled) {
            config.server.enabled = true;
            utils.saveConfig();
        }

        App.server = require('./server').start();
        App.server.io.server.once('listening', function () {
            App.vent.trigger('server:active');
        });
    };

    App.disableServer = function () {
        if (config.server.enabled) {
            config.server.enabled = false;
            utils.saveConfig();
        }

        App.stopServer();
    };

    App.stopServer = function () {
        App.server.stop();
    };

    return App;
};