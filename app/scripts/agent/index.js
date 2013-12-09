var BrowserManager = require('./browsers'),
    io = require('socket.io-client'),
    os = require('os'),
    _ = require('lodash');

var Agent = function (uri) {
    'use strict';
    var client = io.connect(uri),
        browsers = {},
        browserManager = new BrowserManager();

    return {
        name: os.hostname() || 'local',
        client: client,

        sendInfo: function () {
            client.emit('agent', {
                browsers: browserManager.getAvailable(),
                agentId: client.socket.sessionid,
                agentName: this.name
            });
        },

        onConnect: function () {
            this.client.on('open', _.bind(this.onOpen, this));
            this.client.on('close', _.bind(this.onClose, this));
        },

        listen: function () {
            if (this.client.connected) {
                this.onConnect();
            } else {
                this.client.once('connect', _.bind(this.onConnect, this));
                this.client.on('connect', _.bind(this.sendInfo, this));
            }
        },

        onOpen: function (browser, url) {
            this.close(browser);
            this.open(browser, url);
        },

        open: function (browserName, url) {
            browsers[browserName] = new browserManager.getBrowser(browserName)();
            browsers[browserName].open(url || 'http://66.ru', function () {
                browsers[browserName].proc.on('exit', function () {
                    client.emit('agent:close', {
                        browser: browserName
                    });
                });
            });
        },

        onClose: function (browser) {
            this.close(browser);
        },

        close: function (browser) {
            if (browsers[browser]) {
                browsers[browser].proc.kill();
                delete browsers[browser];
            }
        }
    };
}

module.exports = Agent;





