/* eslint-disable strict */
// UMD template: https://github.com/ForbesLindesay/umd/blob/master/template.js
;(function(factory) { // eslint-disable-line no-extra-semi

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();

    // RequireJS (AMD)
    } else if (typeof define === 'function' && define.amd) { // eslint-disable-line no-undef
        define([], factory()); // eslint-disable-line no-undef

    // Browser (script tag)
    } else {
        var root;
        if (typeof window !== 'undefined') {
            root = window;
        } else if (typeof global !== 'undefined') {
            root = global;
        } else if (typeof self !== 'undefined') {
            root = self;
        } else {
            // works provided we're not in strict mode
            root = this;
        }

        // define namespace
        root.HTMLReactParser = factory();
    }

})(function() {

    var domToReact = require('./lib/dom-to-react');
    var htmlToDOM;

    // client (browser)
    if (typeof window !== 'undefined' && this === window) {
        htmlToDOM = require('./lib/html-to-dom-client');

    // server (node)
    } else {
        htmlToDOM = require('./lib/html-to-dom-server');
    }

    /**
     * Convert HTML string to React elements.
     *
     * @param  {String}   html              - The HTML.
     * @param  {Object}   [options]         - The additional options.
     * @param  {Function} [options.replace] - The replace method.
     * @return {ReactElement|Array}
     */
    function HTMLReactParser(html, options) {
        if (typeof html !== 'string') {
            throw new Error('`HTMLReactParser`: The first argument must be a string.');
        }
        return domToReact(htmlToDOM(html), options);
    }

    // source
    return HTMLReactParser;

});
