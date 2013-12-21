var Browser = require('./browser');
var fs = require('fs');
var which = require('which');
var os = require('os');
var child_process = require('child_process');
var _ = require('lodash');

var Firefox = function () {
    return _.extend({}, Browser, {
        name: 'firefox',
        paths: ["/Applications/Firefox.app/Contents/MacOS/firefox-bin", "%PROGRAMFILES%\\Mozilla Firefox\\firefox.exe" ],
        args: [ '*URL*', '-P tissue' ],

        isAvailable: function (onComplete) {
            if (os.platform() == "linux") {
                which("firefox", _.bind(function (err, res) {
                    if (res != null) {
                        this.browserPath = res;
                        return onComplete(null, true);
                    }

                    return onComplete(null, false);
                }, this));
            } else {
                for (var i in this.paths) {
                    if (fs.existsSync(this.paths[i])) {
                        this.browserPath = this.paths[i];
                        return onComplete(null, true);
                    }
                }
            }
        }
    });
};

module.exports = Firefox;
