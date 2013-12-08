define(['marionette', 'underscore', 'views/browser/BrowserListView', 'models/BrowserCollection'],
    function (Marionette, _, BrowserListView, BrowserCollection) {
        var App = Marionette.Application.extend({
            io: null
        });

        App = new App();

        App.addRegions({
            list: "#sidebar-wrapper"
        });

        App.addInitializer(function (options) {
            // do useful stuff here

            var myView = new BrowserListView({collection: new BrowserCollection()});
            App.list.show(myView);
        });

        return App;
    });