var Browser = require('./browser');
var fs = require('fs');
var which = require('which');
var os = require('os');
var cp = require('child_process');
var path = require('path');
var _ = require('lodash');

var Safari = function () {
    return _.extend(Browser, {
        name: 'safari',
        browserPath: '/Applications/Safari.app/Contents/MacOS/Safari',
        args: ['*URL*'],

        isAvailable: function (onComplete) {
            if (os.platform() === 'darwin') {
                return onComplete(null, true);
            }

            return onComplete(null, false);
        }
    });
};

module.exports = Safari;
