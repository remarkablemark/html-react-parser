var DOMProperty = require('react-dom-core/lib/DOMProperty');
var propertyConfig = require('./property-config');
var styleToObject = require('style-to-object');
var utilities = require('./utilities');

var config = propertyConfig.config;
var isCustomAttribute = propertyConfig.HTMLDOMPropertyConfig.isCustomAttribute;
DOMProperty.injection.injectDOMPropertyConfig(
  propertyConfig.HTMLDOMPropertyConfig
);

/**
 * Makes attributes compatible with React props.
 *
 * @param  {Object} attributes - The attributes.
 * @return {Object}            - The props.
 */
function attributesToProps(attributes) {
  attributes = attributes || {};
  var props = {};
  var propertyName;
  var propertyValue;
  var reactProperty;

  for (propertyName in attributes) {
    propertyValue = attributes[propertyName];

    // custom attributes (`data-` and `aria-`)
    if (isCustomAttribute(propertyName)) {
      props[propertyName] = propertyValue;
      continue;
    }

    // make HTML DOM attribute/property consistent with React attribute/property
    reactProperty = config.html[propertyName.toLowerCase()];
    if (reactProperty) {
      if (
        DOMProperty.properties.hasOwnProperty(reactProperty) &&
        DOMProperty.properties[reactProperty].hasBooleanValue
      ) {
        props[reactProperty] = true;
      } else {
        props[reactProperty] = propertyValue;
      }
      continue;
    }

    // make SVG DOM attribute/property consistent with React attribute/property
    reactProperty = config.svg[propertyName];
    if (reactProperty) {
      props[reactProperty] = propertyValue;
    }
  }

  // convert inline style to object
  if (attributes.style != null) {
    props.style = cssToJs(attributes.style);
  }
  return props;
}

/**
 * Converts CSS style string to JS style object.
 *
 * @param  {String} style - The CSS style.
 * @return {Object}       - The JS style object.
 */
function cssToJs(style) {
  if (typeof style !== 'string') {
    throw new TypeError('First argument must be a string.');
  }
  var styleObj = {};

  styleToObject(style, function(propName, propValue) {
    // Check if it's not a comment node
    if (propName && propValue) {
      styleObj[utilities.camelCase(propName)] = propValue;
    }
  });
  return styleObj;
}

module.exports = attributesToProps;
