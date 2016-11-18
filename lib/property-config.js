'use strict';

/**
 * Module dependencies.
 */
var utilities = require('./utilities');

// HTML and SVG DOM Property Configs
var HTMLDOMPropertyConfig = require('react-dom/lib/HTMLDOMPropertyConfig');
var SVGDOMPropertyConfig = require('react-dom/lib/SVGDOMPropertyConfig');

var config = {
    html: {},
    svg: {}
};

var propertyName;

/**
 * HTML DOM property config.
 */

// first map out the HTML DOM attribute names
// e.g., { className: 'class' } => { 'class': 'className' }
// https://github.com/facebook/react/blob/master/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L204
config.html = utilities.invertObject(
    HTMLDOMPropertyConfig.DOMAttributeNames
);

// then map out the rest of the HTML DOM properties
// e.g., { charSet: 0 } => { charset: 'charSet' }
// https://github.com/facebook/react/blob/master/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L28
for (propertyName in HTMLDOMPropertyConfig.Properties) {
    // lowercase to make matching property names easier
    config.html[propertyName.toLowerCase()] = propertyName;
}

/**
 * SVG DOM property config.
 */

// first map out the SVG DOM attribute names
// e.g., { fontSize: 'font-size' } => { 'font-size': 'fontSize' }
// https://github.com/facebook/react/blob/master/src/renderers/dom/shared/SVGDOMPropertyConfig.js#L36
config.svg = utilities.invertObject(
    SVGDOMPropertyConfig.DOMAttributeNames
);

// then map out the rest of the SVG DOM properties
// e.g., { preserveAlpha: 0 } => { preserveAlpha: 'preserveAlpha' }
// https://github.com/facebook/react/blob/master/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L28
for (propertyName in SVGDOMPropertyConfig.Properties) {
    // do not lowercase as some svg properties are camel cased
    config.html[propertyName] = propertyName;
}

/**
 * Export React property configs.
 */
module.exports = {
    config: config,
    HTMLDOMPropertyConfig: HTMLDOMPropertyConfig,
    SVGDOMPropertyConfig: SVGDOMPropertyConfig
};
