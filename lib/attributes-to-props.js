var reactProperty = require('react-property');
var styleToJS = require('style-to-js').default;
var utilities = require('./utilities');

var htmlProperties = reactProperty.html;
var svgProperties = reactProperty.svg;
var isCustomAttribute = reactProperty.isCustomAttribute;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var styleToJSOptions = { reactCompat: true };

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param  {Object} [attributes={}] - The HTML/SVG DOM attributes.
 * @return {Object}                 - The React props.
 */
function attributesToProps(attributes) {
  attributes = attributes || {};

  var attributeName;
  var attributeNameLowerCased;
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
    attributeNameLowerCased = attributeName.toLowerCase();
    if (hasOwnProperty.call(htmlProperties, attributeNameLowerCased)) {
      property = htmlProperties[attributeNameLowerCased];
      props[property.propertyName] =
        property.hasBooleanValue ||
        (property.hasOverloadedBooleanValue && !attributeValue)
          ? true
          : attributeValue;
      continue;
    }

    // convert SVG attribute to React prop
    if (hasOwnProperty.call(svgProperties, attributeName)) {
      property = svgProperties[attributeName];
      props[property.propertyName] = attributeValue;
      continue;
    }

    // preserve custom attribute if React >=16
    if (utilities.PRESERVE_CUSTOM_ATTRIBUTES) {
      props[attributeName] = attributeValue;
    }
  }

  // convert inline style to object
  if (attributes.style != null) {
    props.style = styleToJS(attributes.style, styleToJSOptions);
  }

  return props;
}

module.exports = attributesToProps;
