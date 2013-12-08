define(['backbone'], function (Backbone) {
    /**
     * @class Browser
     * @type {*|void|Object}
     */
    var Browser = Backbone.Model.extend({
        defaults: {
            name: 'none',
            open: false,
            agentId: null
        }
    });

    return Browser;
});