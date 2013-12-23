var BrowserManager = require('./browsers'),
    io = require('socket.io-client'),
    os = require('os'),
    _ = require('lodash'),
    fs = require('fs');

/**
 * @class Agent
 * @param uri
 */
var Agent = function (uri) {
    'use strict';
    var client = io.connect(uri, {'log level': 0}),
        browsers = {},
        browserManager = new BrowserManager();

    return {
        name: os.hostname() || 'local',
        client: client,

        sendInfo: function () {
            console.log('Agent: sending avalable browsers: ', browserManager.getAvailable());

            client.emit('agent', {
                browsers: browserManager.getAvailable(),
                agentId: client.socket.sessionid,
                agentName: this.name
            });
        },

        onConnect: function () {
            this.client.on('open', _.bind(this.onOpen, this));
            this.client.on('close', _.bind(this.onClose, this));
            var fd = fs.openSync(__dirname + '/id.js', 'w+');
            fs.writeSync(fd, 'window.sid = "' + client.socket.sessionid + '";' +
                'window.socketURI = "' + uri + '"');
            fs.close(fd);
            console.log('Agent connected with id: %s', client.socket.sessionid);
        },

        listen: function () {
            if (this.client.socket.connected) {
                this.onConnect();
            } else {
                if (!this.client.socket.connecting) {
                    this.client.socket.connect();
                }

                this.client.once('connect', _.bind(this.onConnect, this));
                this.client.once('connect', _.bind(this.sendInfo, this));
                this.client.on('info', _.bind(this.sendInfo, this));
            }
        },

        onOpen: function (browser, url) {
            this.close(browser);
            this.open(browser, url);
        },

        open: function (browserName, url) {
            console.log('Agent received open command for %s', browserName);
            url = __dirname + '/../../agent.html';
            browsers[browserName] = new browserManager.getBrowser(browserName)();
            browsers[browserName].open(url, function () {
                browsers[browserName].proc.on('exit', function () {
                    client.emit('agent:close', {
                        browser: browserName
                    });
                });
            });
        },

        onClose: function (browserName) {
            console.log('Agent received close command for %s', browserName);
            this.close(browserName);
        },

        close: function (browserName) {
            if (browsers[browserName]) {
                browsers[browserName].close();
                delete browsers[browserName];
                console.log('%s closed', browserName);
            }
        }
    };
}

module.exports = Agent;





