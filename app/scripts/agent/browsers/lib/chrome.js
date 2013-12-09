var Browser = require('./browser');
var fs = require('fs');
var which = require('which');
var os = require('os');
var path = require('path');
var child_process = require('child_process');
var _ = require('lodash');

var Chrome = function () {
    "use strict";

    return _.extend(Browser, {
        name: "chrome",
        paths: [ "/usr/bin/google-chrome", "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome", "%HOMEPATH%i\\Local Settings\\Application Data\\Google\\Chrome\\Application\\chrome.exe", "C:\\Users\\%USERNAME%\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe" ],
        args: [ '*URL*', '--user-data-dir=/tmp', '-incognito'],

        isAvailable: function (onComplete) {
            for (var i in this.paths) {
                if (fs.existsSync(this.paths[i])) {
                    this.browserPath = this.paths[i];
                    return onComplete(null, true);
                }
            }
            if (os.platform() == "linux") {
                which("google-chrome", _.bind(function (err, res) {
                    if (res != null) {
                        this.browserPath = res;
                        return onComplete(null, true);
                    }
                    else return onComplete(null, false);
                }, this));
            }
        }
    });
}

module.exports = Chrome;
