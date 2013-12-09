var path = require('path');
var _ = require('lodash');

var enabledBrowsers = [ "firefox", "chrome", "opera", "safari", 'yandex' ];

var BrowserManager = function () {
    "use strict";

    var browsers = {};

    enabledBrowsers.map(function (browserName) {
        var BrowserClass = require(path.join(__dirname, "lib", browserName)),
            browser = new BrowserClass();

        browser.isAvailable(function (err, result) {
            if (result) {
                browsers[browserName] = BrowserClass;
            }
        });
    });

    return {
        getBrowser: function (browserName) {
            if (browsers[browserName]) {
                return browsers[browserName];
            }

            throw new Error('Unknown browser ' + browserName);
        },
        getAvailable: function () {
            return _.keys(browsers);
        }
    };
};

module.exports = BrowserManager;
