'use strict';

/**
 * Convert a string to camel case.
 *
 * @param  {String} string - The string.
 * @return {String}
 */
function camelCase(string) {
    if (typeof string !== 'string') {
        throw new Error('`camelCase`: first argument must be a string.');
    }

    // hyphen found after first character
    if (string.indexOf('-') > 0) {
        var strings = string.toLowerCase().split('-');

        // capitalize starting from the second string item
        for (var i = 1, len = strings.length; i < len; i++) {
            strings[i] = strings[i].charAt(0).toUpperCase() + strings[i].slice(1);
        }

        return strings.join('');
    }

    return string;
}

/**
 * Swap key with value in an object.
 *
 * @param  {Object} obj - The object.
 * @return {Object}     - The inverted object.
 */
function invertObject(obj) {
    if (typeof obj !== 'object' || !obj) { // null is an object
        throw new Error('`invert`: First argument must be an object.');
    }

    var result = {};
    var key;
    var value;

    for (key in obj) {
        value = obj[key];
        if (typeof value === 'object') {
            throw new Error('`invert`: Object must be flat.');
        }
        result[value] = key;
    }

    return result;
}

/**
 * Export utilties.
 */
module.exports = {
    camelCase: camelCase,
    invertObject: invertObject
};
