'use strict';
var Backbone = require('backbone');


/**
 * @class Browser
 */
module.exports = Backbone.Model.extend({
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
