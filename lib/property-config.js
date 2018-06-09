var HTMLDOMPropertyConfig = require('react-dom-core/lib/HTMLDOMPropertyConfig');
var SVGDOMPropertyConfig = require('react-dom-core/lib/SVGDOMPropertyConfig');
var utilities = require('./utilities');

var config = {
  html: {},
  svg: {}
};

var propertyName;

/**
 * HTML DOM property config.
 *
 * https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/HTMLDOMPropertyConfig.js
 */

// first map out the HTML attribute names
// e.g., { className: 'class' } => { 'class': 'className' }
config.html = utilities.invertObject(HTMLDOMPropertyConfig.DOMAttributeNames);

// then map out the rest of the HTML properties
// e.g., { readOnly: 0 } => { readonly: 'readOnly' }
for (propertyName in HTMLDOMPropertyConfig.Properties) {
  // lowercase to make matching property names easier
  config.html[propertyName.toLowerCase()] = propertyName;
}

/**
 * SVG DOM property config.
 *
 * https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/SVGDOMPropertyConfig.js
 */

// first map out the SVG attribute names
// e.g., { fontSize: 'font-size' } => { 'font-size': 'fontSize' }
config.svg = utilities.invertObject(SVGDOMPropertyConfig.DOMAttributeNames);

// then map out the rest of the SVG properties
// e.g., { fillRule: 0 } => { fillRule: 'fillRule' }
for (propertyName in SVGDOMPropertyConfig.Properties) {
  // do not lowercase as some svg properties are camel cased
  config.html[propertyName] = propertyName;
}

module.exports = {
  config: config,
  HTMLDOMPropertyConfig: HTMLDOMPropertyConfig,
  SVGDOMPropertyConfig: SVGDOMPropertyConfig
};
