var browserManager = require('./lib/browsers'),
    io = require('socket.io-client'),
    os = require('os'),
    _ = require('lodash');

var Agent = function (uri) {
    'use strict';
    var client = io.connect(uri);
    var browsers = {};

    return {
        name: os.hostname() || 'local',
        client: client,

        sendInfo: function () {
            browserManager.browsers(_.bind(function (err, browsers) {
                client.emit('agent', {
                    browsers: browsers,
                    agentId: client.socket.sessionid,
                    agentName: this.name
                });
            }, this));
        },

        onConnect: function () {
            this.sendInfo();
            this.client.on('open', _.bind(this.onOpen, this));
            this.client.on('close', _.bind(this.onClose, this));
        },

        listen: function () {
            if (this.client.connected) {
                this.onConnect();
            } else {
                this.client.on('connect', _.bind(this.onConnect, this));
            }
        },

        onOpen: function (browser, url) {
            this.close(browser);
            this.open(browser, url);
        },

        open: function (browser, url) {
            browsers[browser] = new browserManager[browser]();
            browsers[browser].open(url || 'http://66.ru', function () {
                browsers[browser].proc.on('exit', function () {
                    client.emit('agent:close', {
                        browser: browser
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


new Agent('http://localhost:20001').listen();





