'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var util = require('util');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

/**
 * Render a React element to static HTML markup.
 *
 * @param  {ReactElement} reactElement - The React element.
 * @return {String}                    - The static HTML markup.
 */
function render(reactElement) {
    if (!React.isValidElement(reactElement)) {
        throw new Error(reactElement, 'is not a valid React element.');
    }
    return ReactDOMServer.renderToStaticMarkup(reactElement);
}

/**
 * Test for deep equality between objects that have circular references.
 *
 * @param {Object} actual   - The actual object.
 * @param {Object} expected - The expected object.
 */
function deepEqualCircular(actual, expected) {
    var IS_VISITED_KEY = '_isVisited';

    var actualKeys = Object.keys(actual).sort();
    var expectedKeys = Object.keys(expected).sort();

    // remove extraneous properties (if applicable)
    var isVisitedKeyIndex = actualKeys.indexOf(IS_VISITED_KEY);
    if (isVisitedKeyIndex > -1) {
        actualKeys.splice(isVisitedKeyIndex, 1);
    }

    // compare object keys (sanity check)
    assert.deepStrictEqual(actualKeys, expectedKeys);

    // compare actual against expected
    expectedKeys.forEach(function(key) {
        var actualValue = actual[key];
        var expectedValue = expected[key];

        if (actualValue !== null && typeof actualValue === 'object') {
            // actual and expected are not the same type
            if (expectedValue !== null && typeof expectedValue.constructor === 'object') {
                throw new Error(
                    'Actual value: ' + util.inspect(actualValue) +
                    '\n\nExpected value: ' +
                    util.inspect(expectedValue)
                );
            }

            // no need to revisit an already visited object
            // this is to mitigate exceeding maximum call stack with circular reference
            if (actualValue[IS_VISITED_KEY]) {
                return;

            // otherwise, walk through it
            } else {
                // taint the object to denote that it's been visited
                actualValue[IS_VISITED_KEY] = true;
                return deepEqualCircular(actualValue, expectedValue);
            }

        // compare the values as is
        } else {
            assert.deepStrictEqual(actualValue, expectedValue);
        }
    });
}

/**
 * Export assert helpers.
 */
module.exports = {
    deepEqualCircular: deepEqualCircular,
    render: render
};
