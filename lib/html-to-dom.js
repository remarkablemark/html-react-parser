'use strict';

/**
 * Detect environment.
 */

/** Browser. */
if (typeof window !== 'undefined' && this === window) {
    var formatDOM = require('./html-to-dom-client');

    /**
     * Parse HTML string to DOM nodes.
     * This uses the browser DOM API.
     *
     * @param  {String} html - The HTML.
     * @return {Object}      - The DOM nodes.
     */
    module.exports = function(html) {
        // `DOMParser` can parse full HTML
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
        if (window.DOMParser) {
            var parser = new window.DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            return formatDOM(doc.childNodes);

        // otherwise, use `innerHTML`
        // but this will strip out tags like <html> and <body>
        } else {
            var root = document.createElement('div');
            root.innerHTML = html;
            return formatDOM(root.childNodes);
        }
    };

/** Node. */
} else {
    var Parser = require('htmlparser2/lib/Parser');
    var DomHandler = require('domhandler');

    /**
     * Parse HTML string to DOM nodes.
     * This is the same method as `require('htmlparser2').parseDOM`.
     *
     * @param  {String} html    - The HTML.
     * @param  {Object} options - The parser options.
     * @return {Object}         - The DOM nodes.
     */
    module.exports = function(html, options) {
        var handler = new DomHandler(options);
        new Parser(handler, options).end(html);
        return handler.dom;
    };
}
