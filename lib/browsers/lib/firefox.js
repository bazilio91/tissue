var Browser = require('./browser');
var fs = require('fs');
var which = require('which');
var os = require('os');
var child_process = require('child_process');

var Firefox = function (options) {
    Browser.prototype.constructor.apply(this, arguments);
    this.name = "firefox";
}
var paths = ["/Applications/Firefox.app/Contents/MacOS/firefox-bin", "%PROGRAMFILES%\\Mozilla Firefox\\firefox.exe" ];
var args = [ '*URL*', '-P tissue' ];
var browserPath = null;

Firefox.prototype = new Browser();
Firefox.prototype.constructor = Firefox;

Firefox.prototype.isAvailable = function (onComplete) {
    if (os.platform() == "linux") {
        which("firefox", function (err, res) {
            if (res != null) {
                browserPath = res;
                return onComplete(null, true);
            }
            else return onComplete(null, false);
        });
    } else {
        for (var i in paths) {
            if (fs.existsSync(paths[i])) {
                browserPath = paths[i];
                return onComplete(null, true);
            }
        }
    }
}

Firefox.prototype.openBrowser = function (url, onComplete) {
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

module.exports = Firefox;
