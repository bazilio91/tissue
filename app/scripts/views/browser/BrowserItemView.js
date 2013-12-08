/*global App, define*/
define(['marionette', 'underscore', 'models/Browser'], function (Marionette, _, Browser) {
    'use strict';
    /**
     * @class BrowserItemView
     * @type {*|void|Object}
     */
    var BrowserItemView = Marionette.ItemView.extend({
        tagName: 'li',
        template: '#browser-item',
        className: 'b-browser-item',
        model: Browser,

        modelEvents: {
            'change:open': 'onRender'
        },
        events: {
            'click .js-browser-item__trigger': 'triggerBrowser'
        },

        triggerBrowser: function (e) {
            if (!this.model.get('open')) {
                App.io.sockets.sockets[this.model.get('agentId')].emit(
                    'open',
                    this.model.get('name'),
                    'http://ekabu.ru'
                );

                this.model.set('open', true);
            } else {
                App.io.sockets.sockets[this.model.get('agentId')].emit(
                    'close',
                    this.model.get('name')
                );

                this.model.set('open', false);
            }

            e.preventDefault();
        },
        onRender: function () {
            if (this.model.get('open')) {
                this.$el.addClass('open');
            } else {
                this.$el.removeClass('open');
            }
        }
    });

    return BrowserItemView;
});