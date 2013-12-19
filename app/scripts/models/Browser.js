define(['backbone'], function (Backbone) {
    "use strict";

    /**
     * @class Browser
     * @type {*|void|Object}
     */
    var Browser = Backbone.Model.extend({
        defaults: {
            name: 'none',
            open: false,
            agentId: null,
            connected: false
        },

        run: function (command) {
            if (!this.connected) {
                return false;
            }
            this.socket.emit('eval', command);
        }
    });

    return Browser;
});