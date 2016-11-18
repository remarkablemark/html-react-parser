'use strict';

/**
 * Module dependencies.
 */
var utilities = require('./utilities');
var propertyConfig = require('./property-config');
var config = propertyConfig.config;
var isCustomAttribute = propertyConfig.HTMLDOMPropertyConfig.isCustomAttribute;

/**
 * Make attributes compatible with React props.
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
            props[reactProperty] = propertyValue;
            continue;
        }

        // make SVG DOM attribute/property consistent with React attribute/property
        reactProperty = config.svg[propertyName];
        if (reactProperty) {
            props[reactProperty] = propertyValue;
        }
    }

    // convert inline style to object
    if (attributes.style) {
        props.style = cssToJs(attributes.style);
    }

    return props;
}

/**
 * Convert CSS style string to JS style object.
 *
 * @param  {String} style - The CSS style.
 * @return {Object}       - The JS style object.
 */
function cssToJs(style) {
    if (typeof style !== 'string') {
        throw new Error('`cssToJs`: first argument must be a string. ');
    }

    var result = {};
    // e.g., `color: #f00`
    var declarations = style.split(';');
    // css property itemized as key and value
    var properties;
    var j;
    var propertiesLen;

    for (var i = 0, declarationsLen = declarations.length; i < declarationsLen; i++) {
        properties = declarations[i].trim().split(':');

        // skip if not a css property
        if (properties.length !== 2) { continue; }

        // css property name
        properties[0] = properties[0].trim();
        // css property value
        properties[1] = properties[1].trim();

        if (properties[0] && properties[1]) {
            for (j = 0, propertiesLen = properties.length; j < propertiesLen; j++) {
                result[utilities.camelCase(properties[0])] = properties[1];
            }
        }
    }

    return result;
}

/**
 * Export attributes to props helper.
 */
module.exports = attributesToProps;
