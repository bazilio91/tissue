/*global App, define*/
define(['underscore', 'backbone', 'models/Browser'], function (_, Backbone, Browser) {
    /**
     * @class BrowserCollection
     * @type {*|void|Object}
     */
    var BrowserCollection = Backbone.Collection.extend({
        model: Browser,
        initialize: function () {
            App.io.sockets.on('connection', _.bind(function (socket) {
                socket.on('agent', _.bind(this.onAgentConnected, this, socket));
                socket.on('agent:close', _.bind(this.onAgentClose, this, socket));
                socket.on('disconnect', _.bind(this.onAgentDisconnected, this, socket))
            }, this));
        },

        onAgentConnected: function (socket, data) {
            console.log(data);
            _.each(data.browsers, _.bind(function (browser) {
                this.add({name: browser, agentId: socket.id, agentName: data.agentName});
            }, this))
        },

        onAgentClose: function (socket, data) {
            var browser = this.findWhere({agentId: socket.id, name: data.browser});
            browser.set('open', false);
        },

        onAgentDisconnected: function (socket) {
            this.remove(this.where({agentId: socket.id}));
        }
    });

    return BrowserCollection;
});