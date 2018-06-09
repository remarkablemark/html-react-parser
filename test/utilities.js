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

    it("does nothing if the string doesn't need to be camel cased", function() {
      assert.equal(camelCase(''), '');
      assert.equal(camelCase('foo'), 'foo');
      assert.equal(camelCase('fooBar'), 'fooBar');
    });

    it('properly camel cases a string', function() {
      assert.equal(camelCase('foo-bar'), 'fooBar');
      assert.equal(camelCase('foo-bar-baz'), 'fooBarBaz');
      assert.equal(camelCase('CAMEL-CASE'), 'camelCase');
    });

    it('errors if the first argument is invalid', function() {
      [undefined, null, 1337, {}, []].forEach(function(parameter) {
        assert.throws(function() {
          camelCase(parameter);
        }, TypeError);
      });
    });
  });

  describe('`invertObject` helper', function() {
    var invertObject = utilities.invertObject;

    it('errors if the first argument is invalid', function() {
      [undefined, null, 'foo', 1337].forEach(function(parameter) {
        assert.throws(function() {
          invertObject(parameter);
        }, TypeError);
      });
    });

    it('swaps key with value for object', function() {
      assert.deepEqual(invertObject({ foo: 'bar', baz: 'qux' }), {
        bar: 'foo',
        qux: 'baz'
      });
    });

    it('swaps only if value is string', function() {
      assert.deepEqual(
        invertObject({
          $: 'dollar',
          _: 'underscore',
          num: 1,
          u: undefined,
          n: null
        }),
        {
          dollar: '$',
          underscore: '_'
        }
      );
    });

    it('uses override if valid', function() {
      assert.deepEqual(
        invertObject({ foo: 'bar', baz: 'qux' }, function(key) {
          if (key === 'foo') {
            return ['key', 'value'];
          }
        }),
        { key: 'value', qux: 'baz' }
      );
    });

    it('does not use override if invalid', function() {
      assert.deepEqual(
        invertObject({ foo: 'bar', baz: 'qux' }, function(key) {
          if (key === 'foo') {
            return ['key'];
          } else if (key === 'baz') {
            return { key: 'value' };
          }
        }),
        { bar: 'foo', qux: 'baz' }
      );
    });
  });
});
