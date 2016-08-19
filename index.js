'use strict';

/**
 * Module dependencies.
 */
var htmlToDOM = require('./lib/html-to-dom');
var domToReact = require('./lib/dom-to-react');

/**
 * Convert HTML to React.
 *
 * @param  {String} html - The HTML.
 * @return {ReactElement|Array}
 */
function htmlToReact(html) {
    return domToReact(htmlToDOM(html));
}

/**
 * Export HTML to React parser.
 */
module.exports = htmlToReact;
