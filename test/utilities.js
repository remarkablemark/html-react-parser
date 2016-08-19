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

    describe('`invertObject` helper', function() {
        var invertObject = utilities.invertObject;

        it('swaps key with value for object', function() {
            assert.deepEqual(
                invertObject({ foo: 'bar', baz: 'qux' }),
                { bar: 'foo', qux: 'baz' }
            );

            // check for unusual cases
            assert.deepEqual(
                invertObject({
                    $: 'dollar',
                    _: 'underscore',
                    num: 1,
                    u: undefined
                }),
                {
                    dollar: '$',
                    underscore: '_',
                    '1': 'num',
                    'undefined': 'u'
                }
            );
        });

        it('swaps key with value for array', function() {
            assert.deepEqual(
                invertObject(['zero', 'one']),
                { 'zero': '0', 'one': '1' }
            );
        });

        it('throws an error if the first argument is invalid', function() {
            [undefined, null, 'foo', 1337].forEach(function(parameter) {
                assert.throws(function() { invertObject(parameter); });
            });
        })

        it('throws an error if object is not flat', function() {
            assert.throws(function() { invertObject({ nested: {} }); });
            assert.throws(function() { invertObject({ obj: null }); });
        })
    });

});
