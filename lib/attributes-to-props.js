'use strict';

/**
 * Module dependencies.
 */
var utilities = require('./utilities');

/**
 * Make attributes compatible with React props.
 *
 * @param  {Object} attr - The attributes.
 * @return {Object}      - The props.
 */
function attributesToProps(attr) {
    attr = attr || {};

    if (attr.style) {
        attr.style = cssToJs(attr.style);
    }

    return attr;
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
