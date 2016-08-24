'use strict';

/**
 * Module dependencies.
 */
var domToReact = require('./lib/dom-to-react');
var htmlToDOM;

/**
 * Detect environment.
 */

/** Client (Browser). */
if (typeof window !== 'undefined' && this === window) {
    htmlToDOM = require('./lib/html-to-dom-client');

/** Server (Node). */
} else {
    htmlToDOM = require('./lib/html-to-dom-server');
}

/**
 * Convert HTML to React.
 *
 * @param  {String}   html              - The HTML.
 * @param  {Object}   [options]         - The additional options.
 * @param  {Function} [options.replace] - The replace method.
 * @return {ReactElement|Array}
 */
module.exports = function(html, options) {
    return domToReact(htmlToDOM(html), options);
};
