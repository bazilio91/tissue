var Browser = require('./browser');
var fs = require('fs');
var which = require('which');
var os = require('os');
var path = require('path');
var child_process = require('child_process');
var _ = require('lodash');

var Yandex = function () {
    "use strict";

    return _.extend({}, Browser, {
        name: 'yandex',
        paths: [ '/Applications/Yandex.app/Contents/MacOS/Yandex'],
        args: [ '*URL*', '--user-data-dir=/tmp', '-incognito'],

        isAvailable: function (onComplete) {
            for (var i in this.paths) {
                if (fs.existsSync(this.paths[i])) {
                    this.browserPath = this.paths[i];
                    return onComplete(null, true);
                }
            }

            return onComplete(null, false);
        }
    });
}

module.exports = Yandex;
