/*global App*/
'use strict';
var _ = require('lodash'),
    Backbone = require('backbone'),
    Browser = require('./Browser');

/**
 * @class BrowserCollection
 */
module.exports = Backbone.Collection.extend({
    model: Browser,
    initialize: function () {
        app.vent.on('server:active', function () {
            app.server.io.sockets.on('connection', _.bind(function (socket) {
                socket.once('agent', _.bind(this.onAgentConnected, this, socket));
                socket.on('agent:close', _.bind(this.onAgentClose, this, socket));
                socket.once('disconnect', _.bind(this.onAgentDisconnected, this, socket));
                socket.on('browser', _.bind(this.onBrowserConnected, this, socket));
            }, this));
        }, this);
    },

    onAgentConnected: function (socket, data) {
        _.each(data.browsers, _.bind(function (browser) {
            if (!this.findWhere({agentId: socket.id, name: browser})) {
                this.add({name: browser, agentId: socket.id, agentName: data.agentName});
            }
        }, this));
    },

    onAgentClose: function (socket, data) {
        var browser = this.findWhere({agentId: socket.id, name: data.browser});
        browser.set('open', false);
    },

    onAgentDisconnected: function (socket) {
        this.remove(this.where({agentId: socket.id}));
    },

    onBrowserConnected: function (socket, info, agentId) {
        var browser = this.findWhere({
            agentId: agentId,
            name: info.browser.name.toLowerCase()
        });

        browser.info = info;
        browser.socket = socket;
        browser.connected = true;

        socket.once('disconnect', function () {
            browser.connected = false;
        });
    }
});