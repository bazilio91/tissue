'use strict';
var utils = require('./utils');

module.exports = {
    io: null,
    start: function () {
        var config = utils.getConfig();
        this.io = require('socket.io', {'log level': config.server.logLevel})
            .listen(config.server.port);

        return this;
    },
    stop: function () {
        this.io.server.close();

        return this;
    }
};