"use strict";
// Declare variables
var fs = require('fs'),
    _ = require('lodash'),
    config,
    defaultConfig = {
        server: {
            port: 20000,
            host: 'localhost',
            logLevel: 0,
            enabled: false
        },
        agent: {
            enabled: false
        }
    };

module.exports = {
    getConfig: function (force) {
        force = force || false;
        if (!config || force) {
            try {
                config = JSON.parse(fs.readFileSync(__dirname + '/data/config.json'));
            } catch (e) {
                config = defaultConfig;
                this.saveConfig();
            }
        }

        return config;
    },

    saveConfig: function () {
        config = _.extend(defaultConfig, config);
        fs.writeFileSync(__dirname + '/data/config.json', JSON.stringify(config));
    }
};