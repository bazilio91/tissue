var Browser = require('./browser');
var fs = require('fs');
var which = require('which');
var os = require('os');
var cp = require('child_process');
var path = require('path');

var Safari = function (options) {
    Browser.prototype.constructor.apply(this, arguments);
    this.name = "safari";
}

Safari.prototype = new Browser();
Safari.prototype.constructor = Safari;

Safari.prototype.isAvailable = function (onComplete) {
    if (os.platform() == "darwin") {
        return onComplete(null, true);
    } else return onComplete(null, false);
}

Safari.homeDir = function () {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

Safari.prototype.prepare = function (onComplete) {
    return onComplete(null, true);
}

Safari.prototype.openBrowser = function (url, onComplete) {

}

module.exports = Safari;
