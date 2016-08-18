'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var utilities = require('../lib/utilities');

/**
 * Tests for utilties.
 */
describe('utilties', function() {

    describe('`camelCase` helper', function() {
        var camelCase = utilities.camelCase;

        it('does nothing if the string doesn\'t need to be camel cased', function() {
            assert.equal(camelCase(''), '');
            assert.equal(camelCase('foo'), 'foo');
            assert.equal(camelCase('fooBar'), 'fooBar');
        });

        it('properly camel cases a string', function() {
            assert.equal(camelCase('foo-bar'), 'fooBar');
            assert.equal(camelCase('foo-bar-baz'), 'fooBarBaz');
            assert.equal(camelCase('CAMEL-CASE'), 'camelCase');
        });

        it('throws an error if the first argument is invalid', function() {
            [undefined, null, 1337, {}, []].forEach(function(parameter) {
                assert.throws(function() { camelCase(parameter); });
            });
        })
    });

});
