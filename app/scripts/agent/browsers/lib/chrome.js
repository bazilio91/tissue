var Browser = require('./browser');
var fs = require('fs');
var which = require('which');
var os = require('os');
var cp = require('child_process');
var path = require('path');
var child_process = require('child_process');

var Chrome = function (options) {
    Browser.prototype.constructor.apply(this, arguments);
    this.name = "chrome";
}

Chrome.prototype = new Browser();
Chrome.prototype.constructor = Chrome;

var paths = [ "/usr/bin/google-chrome", "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome", "%HOMEPATH%i\\Local Settings\\Application Data\\Google\\Chrome\\Application\\chrome.exe", "C:\\Users\\%USERNAME%\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe" ];
var browserPath = null;
var args = [ '*URL*', '--user-data-dir=/tmp', '-incognito'];
Chrome.prototype.prepare = function (onComplete) {
    var self = this;
    onComplete(null, true);
}

Chrome.prototype.isAvailable = function (onComplete) {
    for (var i in paths) {
        if (fs.existsSync(paths[i])) {
            browserPath = paths[i];
            return onComplete(null, true);
        }
    }
    if (os.platform() == "linux") {
        which("google-chrome", function (err, res) {
            if (res != null) {
                paths = res;
                return onComplete(null, true);
            }
            else return onComplete(null, false);
        });
    }
}

Chrome.prototype.openBrowser = function (url, onComplete) {
    var browserArgs = args.map(function (arg) {
        if (arg === '*URL*') {
            return url;
        } else {
            return arg;
        }
    });

    this.proc = child_process.spawn(browserPath, browserArgs);
    if (onComplete) {
        onComplete(null);
    }
}

Chrome.prototype.close = function () {
    if (this.proc) {
        this.proc.kill();
    }
};
module.exports = Chrome;
