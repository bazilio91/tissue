var Browser = require('./browser');
var fs = require('fs');
var which = require('which');
var os = require('os');
var _ = require('lodash');

var Opera = function () {
    "use strict";

    return _.extend(Browser, {
        name: 'opera',
        paths: [ "/usr/bin/opera", "/usr/bin/opera-next", "/usr/bin/operamobile", "/Applications/Opera.app/Contents/MacOS/Opera", "/Applications/Opera Next.app/Contents/MacOS/Opera", "/Applications/Opera Mobile Emulator.app/Contents/Resources/Opera Mobile.app/Contents/MacOS/operamobile", "%PROGRAMFILES%\Opera\opera.exe", "%PROGRAMFILES%\Opera Next\opera.exe", "%PROGRAMFILES%\Opera Mobile Emulator\OperaMobileEmu.exe"],
        args: ['*URL*', '-nosession', '-nomail', '-csp'],

        isAvailable: function (onComplete) {
            for (var i in this.paths) {
                if (fs.existsSync(this.paths[i])) {
                    this.browserPath = this.paths[i];
                    return onComplete(null, true);
                }
            }
        }
    });
};

module.exports = Opera;
