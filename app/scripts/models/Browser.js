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

        run: function (command, cb) {
            if (!this.socket) {
                return;
            }

            this.socket.emit('eval', command, function (data) {
                cb(data);
            });
        }
    });

    return Browser;
});