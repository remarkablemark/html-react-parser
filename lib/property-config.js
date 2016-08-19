'use strict';

/**
 * Module dependencies.
 */
var HTMLDOMPropertyConfig = require('react/lib/HTMLDOMPropertyConfig');
var utilities = require('./utilities');

// first map out the DOM attribute names
// e.g., { className: 'class' } => { class: 'className' }
// https://github.com/facebook/react/blob/master/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L204
var config = utilities.invertObject(
    HTMLDOMPropertyConfig.DOMAttributeNames
);

// then map out the rest of the DOM properties
// e.g., { charSet: 0 } => { charset: 'charSet' }
// https://github.com/facebook/react/blob/master/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L28
for (var key in HTMLDOMPropertyConfig.Properties) {
    config[key.toLowerCase()] = key;
}

/**
 * Export React property config.
 */
module.exports = config;
