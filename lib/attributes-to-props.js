var DOMProperty = require('react-dom-core/lib/DOMProperty');
var propertyConfig = require('./property-config');
var styleToObject = require('style-to-object');
var utilities = require('./utilities');
var camelCase = utilities.camelCase;

var config = propertyConfig.config;
var isCustomAttribute = propertyConfig.HTMLDOMPropertyConfig.isCustomAttribute;
DOMProperty.injection.injectDOMPropertyConfig(
  propertyConfig.HTMLDOMPropertyConfig
);

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param  {Object} [attributes={}] - The HTML/SVG DOM attributes.
 * @return {Object}                 - The React props.
 */
function attributesToProps(attributes) {
  attributes = attributes || {};

  var attributeName;
  var attributeValue;
  var property;
  var props = {};

  for (attributeName in attributes) {
    attributeValue = attributes[attributeName];

    // ARIA (aria-*) or custom data (data-*) attribute
    if (isCustomAttribute(attributeName)) {
      props[attributeName] = attributeValue;
      continue;
    }

    // convert HTML attribute to React prop
    property = config.html[attributeName.toLowerCase()];
    if (property) {
      if (
        Object.prototype.hasOwnProperty.call(
          DOMProperty.properties,
          property
        ) &&
        DOMProperty.properties[property].hasBooleanValue
      ) {
        props[property] = true;
      } else {
        props[property] = attributeValue;
      }
      continue;
    }

    // convert SVG attribute to React prop
    property = config.svg[attributeName];
    if (property) {
      props[property] = attributeValue;
      continue;
    }

    // custom attribute
    if (utilities.PRESERVE_CUSTOM_ATTRIBUTES) {
      props[attributeName] = attributeValue;
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

  styleToObject(style, function(property, value) {
    // skip if it's a comment node
    if (property && value) {
      styleObj[camelCase(property)] = value;
    }
  });

  return styleObj;
}

module.exports = attributesToProps;
