var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var Browser = {
    proc: null,
    args: [],
    browserPath: null,

    isAvailable: function (onComplete) {
        return onComplete(null, true);
    },
    openBrowser: function (url, onComplete) {
        var browserArgs = this.args.map(function (arg) {
            if (arg === '*URL*') {
                return url;
            }

            return arg;

        });

        this.proc = child_process.spawn(this.browserPath, browserArgs);
        if (onComplete) {
            onComplete(null);
        }
    },
    open: function (url, onComplete) {
        var self = this;
        self.isAvailable(function (err, available) {
            if (err) {
                return onComplete(err);
            }

            if (available) {
                self.openBrowser(url, onComplete);
            } else {
                return onComplete(null, null);
            }
        });
    },
    close: function () {
        if (this.proc) {
            this.proc.kill();
        }
    }
};


module.exports = Browser;
