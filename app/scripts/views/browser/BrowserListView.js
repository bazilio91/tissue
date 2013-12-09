define(['marionette', 'views/browser/BrowserItemView'], function (Marionette, BrowserItemView) {
    /**
     * @class BrowserListView
     * @type {*|void|Object}
     */
    var BrowserListView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'sidebar-nav',
        itemView: BrowserItemView,
        emptyView: Backbone.Marionette.ItemView.extend({
            template: _.template('<li>No enabledBrowsers online</li>')
        })
    });

    return BrowserListView;
});