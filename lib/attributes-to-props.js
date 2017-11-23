'use strict';

/**
 * Module dependencies.
 */
var utilities = require('./utilities');
var propertyConfig = require('./property-config');
var csstree = require('css-tree');
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

    var styleObj = {};

    var ast = csstree.parse(style, {
        context: 'declarationList',
        parseValue: false
    });

    csstree.walk(ast, function (node) {
        if(node.type === 'Declaration') {
            var propertyCamelCase = node.property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            styleObj[propertyCamelCase] = node.value.value;
        }
    });

    return styleObj;
}

/**
 * Export attributes to props helper.
 */
module.exports = attributesToProps;
